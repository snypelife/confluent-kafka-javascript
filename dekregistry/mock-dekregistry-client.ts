import { Client, Dek, Kek } from "./dekregistry-client";
import { MOCK_TS } from "./constants";
import stringify from "json-stringify-deterministic";

class MockDekRegistryClient implements Client {
  private kekCache: Map<string, Kek>;
  private dekCache: Map<string, Dek>;

  constructor() {
    this.kekCache = new Map<string, Kek>();
    this.dekCache = new Map<string, Dek>();
  }

  public async registerKek(name: string, kmsType: string, kmsKeyId: string,
    kmsProps: { [key: string]: string }, doc: string, shared: boolean): Promise<Kek> {
    const cacheKey = stringify({ name, deleted: false });
    const cachedKek = this.kekCache.get(cacheKey);
    if (cachedKek) {
      return cachedKek;
    }

    const kek: Kek = {
      name,
      kmsType,
      kmsKeyId,
      kmsProps,
      doc,
      shared
    };

    this.kekCache.set(cacheKey, kek);
    return kek;
  }

  public async getKek(name: string, deleted: boolean = false): Promise<Kek> {
    const cacheKey = stringify({ name, deleted });
    const cachedKek = this.kekCache.get(cacheKey);
    if (cachedKek && (!cachedKek.deleted || deleted)) {
      return cachedKek;
    }

    throw new Error(`Kek not found: ${name}`);
  }

  public async registerDek(kekName: string, subject: string,
    algorithm: string, encryptedKeyMaterial: string, version: number): Promise<Dek> {
    const cacheKey = stringify({ kekName, subject, version, algorithm, deleted: false });
    const cachedDek = this.dekCache.get(cacheKey);
    if (cachedDek) {
      return cachedDek;
    }

    const dek: Dek = {
      kekName,
      subject,
      algorithm,
      encryptedKeyMaterial,
      version,
      ts: MOCK_TS
    };

    this.dekCache.set(cacheKey, dek);
    return dek;
  }

  public async getDek(kekName: string, subject: string,
    algorithm: string, version: number = 1, deleted: boolean = false): Promise<Dek> {
    if (version === -1) {
      let latestVersion = 0;
      for (let key of this.dekCache.keys()) {
        const parsedKey = JSON.parse(key);
        if (parsedKey.kekName === kekName && parsedKey.subject === subject 
          && parsedKey.algorithm === algorithm && parsedKey.deleted === deleted) {
          latestVersion = Math.max(latestVersion, parsedKey.version);
        }
      }
      if (latestVersion === 0) {
        throw new Error(`Dek not found: ${subject}`);
      }
      version = latestVersion;
    }

    const cacheKey = stringify({ kekName, subject, version, algorithm, deleted });
    const cachedDek = this.dekCache.get(cacheKey);
    if (cachedDek) {
      return cachedDek;
    }

    throw new Error(`Dek not found: ${subject}`);
  }

  public async close() {
    return;
  }
}

export { MockDekRegistryClient };