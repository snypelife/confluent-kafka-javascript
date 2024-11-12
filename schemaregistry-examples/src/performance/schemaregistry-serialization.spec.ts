import {
  AvroSerializer, AvroDeserializer, AvroSerializerConfig, SerdeType, Serializer, Deserializer,
  JsonSerializer, JsonDeserializer, JsonSerializerConfig,
  ClientConfig, SchemaRegistryClient, SchemaInfo, Rule, RuleMode, RuleSet
} from "@confluentinc/schemaregistry";
import { localAuthCredentials } from "../constants";
import { v4 } from "uuid";
import { beforeEach, describe, it } from '@jest/globals';

const clientConfig: ClientConfig = {
  baseURLs: ['http://localhost:8081'],
  cacheCapacity: 512,
  cacheLatestTtlSecs: 60,
  basicAuthCredentials: localAuthCredentials,
};

const avroSchemaString: string = JSON.stringify({
  type: 'record',
  name: 'User',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'age', type: 'int' },
    { name: 'address', type: 'string' },
  ],
});

let encRule: Rule = {
  name: 'EncryptionDemo',
  kind: 'TRANSFORM',
  mode: RuleMode.WRITEREAD,
  type: 'ENCRYPT',
  tags: ['PII'],
  params: {
    'encrypt.kek.name': 'schemaregistryperf',
    'encrypt.kms.type': 'aws-kms',
    'encrypt.kms.key.id': 'your-kms-key',
  },
  onFailure: 'ERROR,NONE'
};

let ruleSet: RuleSet = {
  domainRules: [encRule]
};


const jsonSchemaString: string = JSON.stringify({
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "integer"
    },
    "address": {
      "type": "string"
    }
  },
  "required": ["name", "age", "address"]
});

const avroSchemaInfo: SchemaInfo = {
  schema: avroSchemaString,
  schemaType: 'AVRO'
};

const jsonSchemaInfo: SchemaInfo = {
  schema: jsonSchemaString,
  schemaType: 'JSON'
};

const avroSchemaInfoWithRules: SchemaInfo = {
  schema: avroSchemaString,
  schemaType: 'AVRO',
  ruleSet: ruleSet
};

const jsonSchemaInfoWithRules: SchemaInfo = {
  schema: jsonSchemaString,
  schemaType: 'JSON',
  ruleSet: ruleSet
};

const data: { name: string; age: number; address: string; }[] = [];

let schemaRegistryClient: SchemaRegistryClient;

function generateData(numRecords: number) {
  for (let i = 0; i < numRecords; i++) {
    data.push({
      name: `User ${i}`,
      age: Math.floor(Math.random() * 100),
      address: v4()
    });
  }
}

const numRecords = 10000;

generateData(numRecords);

async function serializeAndDeserializeSchemas(serializer: Serializer, deserializer: Deserializer, topic: string) {
  await Promise.all(
    data.map(async (record) => {
      const serialized = await serializer.serialize(topic, record);
      await deserializer.deserialize(topic, serialized);
    })
  );
}

describe('Concurrent Serialization Performance Test', () => {

  beforeEach(async () => {
    schemaRegistryClient = new SchemaRegistryClient(clientConfig);
  });

  it("Should measure serialization and deserialization performance for JSON", async () => {
    const topic = v4();
    await schemaRegistryClient.register(topic + "-value", jsonSchemaInfo);
    
    const jsonSerializerConfig: JsonSerializerConfig = { useLatestVersion: true };
    const jsonSerializer: JsonSerializer = new JsonSerializer(schemaRegistryClient, SerdeType.VALUE, jsonSerializerConfig);
    const jsonDeserializer: JsonDeserializer = new JsonDeserializer(schemaRegistryClient, SerdeType.VALUE, {});

    const start = performance.now();
    await serializeAndDeserializeSchemas(jsonSerializer, jsonDeserializer, topic);
    const end = performance.now();

    console.log(`Concurrent JSON serialization and deserialization took ${end - start} ms`);
  });

  it("Should measure serialization and deserialization performance for Avro", async () => {
    const topic = v4();
    await schemaRegistryClient.register(topic + "-value", avroSchemaInfo);

    const avroSerializerConfig: AvroSerializerConfig = { useLatestVersion: true };
    const avroSerializer: AvroSerializer = new AvroSerializer(schemaRegistryClient, SerdeType.VALUE, avroSerializerConfig);
    const avroDeserializer: AvroDeserializer = new AvroDeserializer(schemaRegistryClient, SerdeType.VALUE, {});

    const start = performance.now();
    await serializeAndDeserializeSchemas(avroSerializer, avroDeserializer, topic);
    const end = performance.now();

    console.log(`Concurrent Avro serialization and deserialization took ${end - start} ms`);
  });

  // it("Should measure serialization and deserialization performance for Protobuf", async () => {
  //   const protobufSerializerConfig: ProtobufSerializerConfig = { useLatestVersion: true };
  //   const serializer: ProtobufSerializer = new ProtobufSerializer(schemaRegistryClient, SerdeType.VALUE, protobufSerializerConfig);
  //   const deserializer: ProtobufDeserializer = new ProtobufDeserializer(schemaRegistryClient, SerdeType.VALUE, {});

  //   const start = performance.now();
  //   await serializeAndDeserializeSchemas(serializer, deserializer, topic);
  //   const end = performance.now();

  //   console.log(`Protobuf serialization and deserialization took ${end - start} ms`);
  // });
});

describe('Concurrent Serialization Performance Test with Rules', () => {
  beforeEach(async () => {
    schemaRegistryClient = new SchemaRegistryClient(clientConfig);
  });

  it("Should measure serialization and deserialization performance for JSON with rules", async () => {
    const topic = v4();
    await schemaRegistryClient.register(topic + "-value", jsonSchemaInfoWithRules);

    const jsonSerializerConfig: JsonSerializerConfig = { useLatestVersion: true };
    const jsonSerializer: JsonSerializer = new JsonSerializer(schemaRegistryClient, SerdeType.VALUE, jsonSerializerConfig);
    const jsonDeserializer: JsonDeserializer = new JsonDeserializer(schemaRegistryClient, SerdeType.VALUE, {});

    const start = performance.now();
    await serializeAndDeserializeSchemas(jsonSerializer, jsonDeserializer, topic);
    const end = performance.now();

    console.log(`Concurrent JSON serialization and deserialization with rules took ${end - start} ms`);
  });

  it("Should measure serialization and deserialization performance for Avro with rules", async () => {
    const topic = v4();
    await schemaRegistryClient.register(topic + "-value", avroSchemaInfoWithRules);

    const avroSerializerConfig: AvroSerializerConfig = { useLatestVersion: true };
    const avroSerializer: AvroSerializer = new AvroSerializer(schemaRegistryClient, SerdeType.VALUE, avroSerializerConfig);
    const avroDeserializer: AvroDeserializer = new AvroDeserializer(schemaRegistryClient, SerdeType.VALUE, {});

    const start = performance.now();
    await serializeAndDeserializeSchemas(avroSerializer, avroDeserializer, topic);
    const end = performance.now();

    console.log(`Concurrent Avro serialization and deserialization with rules took ${end - start} ms`);
  });
}); 

describe("Sequential Serialization Performance Test", () => {
  beforeEach(async () => {
    schemaRegistryClient = new SchemaRegistryClient(clientConfig);
  });

  it("Should measure serialization and deserialization performance for JSON", async () => {
    const topic = v4();
    await schemaRegistryClient.register(topic + "-value", jsonSchemaInfo);

    const jsonSerializerConfig: JsonSerializerConfig = { useLatestVersion: true };
    const jsonSerializer: JsonSerializer = new JsonSerializer(schemaRegistryClient, SerdeType.VALUE, jsonSerializerConfig);
    const jsonDeserializer: JsonDeserializer = new JsonDeserializer(schemaRegistryClient, SerdeType.VALUE, {});

    await jsonSerializer.serialize(topic, data[0]);

    const start = performance.now();
    for (let i = 0; i < numRecords; i++) {
      const serialized = await jsonSerializer.serialize(topic, data[i]);
      await jsonDeserializer.deserialize(topic, serialized);
    }
    const end = performance.now();

    console.log(`Sequential JSON serialization and deserialization took ${end - start} ms`);
  });

  it("Should measure serialization and deserialization performance for Avro", async () => {
    const topic = v4();
    await schemaRegistryClient.register(topic + "-value", avroSchemaInfo);

    const avroSerializerConfig: AvroSerializerConfig = { useLatestVersion: true };
    const avroSerializer: AvroSerializer = new AvroSerializer(schemaRegistryClient, SerdeType.VALUE, avroSerializerConfig);
    const avroDeserializer: AvroDeserializer = new AvroDeserializer(schemaRegistryClient, SerdeType.VALUE, {});

    await avroSerializer.serialize(topic, data[0]);

    const start = performance.now();
    for (let i = 0; i < numRecords; i++) {
      const serialized = await avroSerializer.serialize(topic, data[i]);
      await avroDeserializer.deserialize(topic, serialized);
    }
    const end = performance.now();

    console.log(`Sequential Avro serialization and deserialization took ${end - start} ms`);
  });
});

describe("Sequential Serialization Performance Test with Rules", () => {
  beforeEach(async () => {
    schemaRegistryClient = new SchemaRegistryClient(clientConfig);
  });

  it("Should measure serialization and deserialization performance for JSON with rules", async () => {
    const topic = v4();
    await schemaRegistryClient.register(topic + "-value", jsonSchemaInfoWithRules);

    const jsonSerializerConfig: JsonSerializerConfig = { useLatestVersion: true };
    const jsonSerializer: JsonSerializer = new JsonSerializer(schemaRegistryClient, SerdeType.VALUE, jsonSerializerConfig);
    const jsonDeserializer: JsonDeserializer = new JsonDeserializer(schemaRegistryClient, SerdeType.VALUE, {});

    await jsonSerializer.serialize(topic, data[0]);

    const start = performance.now();
    for (let i = 0; i < numRecords; i++) {
      const serialized = await jsonSerializer.serialize(topic, data[i]);
      await jsonDeserializer.deserialize(topic, serialized);
    }
    const end = performance.now();

    console.log(`Sequential JSON serialization and deserialization with rules took ${end - start} ms`);
  });

  it("Should measure serialization and deserialization performance for Avro with rules", async () => {
    const topic = v4();
    await schemaRegistryClient.register(topic + "-value", avroSchemaInfoWithRules);

    const avroSerializerConfig: AvroSerializerConfig = { useLatestVersion: true };
    const avroSerializer: AvroSerializer = new AvroSerializer(schemaRegistryClient, SerdeType.VALUE, avroSerializerConfig);
    const avroDeserializer: AvroDeserializer = new AvroDeserializer(schemaRegistryClient, SerdeType.VALUE, {});

    await avroSerializer.serialize(topic, data[0]);

    const start = performance.now();
    for (let i = 0; i < numRecords; i++) {
      const serialized = await avroSerializer.serialize(topic, data[i]);
      await avroDeserializer.deserialize(topic, serialized);
    }
    const end = performance.now();

    console.log(`Sequential Avro serialization and deserialization with rules took ${end - start} ms`);
  });

});
