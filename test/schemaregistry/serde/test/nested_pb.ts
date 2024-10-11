// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file test/schemaregistry/serde/nested.proto (package test, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file test/schemaregistry/serde/nested.proto.
 */
export const file_test_schemaregistry_serde_nested: GenFile = /*@__PURE__*/
  fileDesc("CiZ0ZXN0L3NjaGVtYXJlZ2lzdHJ5L3NlcmRlL25lc3RlZC5wcm90bxIEdGVzdCJsCgZVc2VySWQSFwoNa2Fma2FfdXNlcl9pZBgBIAEoCUgAEhcKDW90aGVyX3VzZXJfaWQYAiABKAVIABIlCgphbm90aGVyX2lkGAMgASgLMg8udGVzdC5NZXNzYWdlSWRIAEIJCgd1c2VyX2lkIhcKCU1lc3NhZ2VJZBIKCgJpZBgBIAEoCSJSCgtDb21wbGV4VHlwZRIQCgZvbmVfaWQYASABKAlIABISCghvdGhlcl9pZBgCIAEoBUgAEhEKCWlzX2FjdGl2ZRgDIAEoCEIKCghzb21lX3ZhbCLcAwoNTmVzdGVkTWVzc2FnZRIdCgd1c2VyX2lkGAEgASgLMgwudGVzdC5Vc2VySWQSEQoJaXNfYWN0aXZlGAIgASgIEhoKEmV4cGVyaW1lbnRzX2FjdGl2ZRgDIAMoCRIuCgp1cGRhdGVkX2F0GAQgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIcCgZzdGF0dXMYBSABKA4yDC50ZXN0LlN0YXR1cxInCgxjb21wbGV4X3R5cGUYBiABKAsyES50ZXN0LkNvbXBsZXhUeXBlEjIKCG1hcF90eXBlGAcgAygLMiAudGVzdC5OZXN0ZWRNZXNzYWdlLk1hcFR5cGVFbnRyeRIvCgVpbm5lchgIIAEoCzIgLnRlc3QuTmVzdGVkTWVzc2FnZS5Jbm5lck1lc3NhZ2UaLgoMTWFwVHlwZUVudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEaKwoMSW5uZXJNZXNzYWdlEgoKAmlkGAEgASgJEg8KA2lkcxgCIAMoBUICEAEiKAoJSW5uZXJFbnVtEggKBFpFUk8QABINCglBTFNPX1pFUk8QABoCEAFKBAgOEA9KBAgPEBBKBAgJEAxSA2Zvb1IDYmFyKiIKBlN0YXR1cxIKCgZBQ1RJVkUQABIMCghJTkFDVElWRRABQglaBy4uL3Rlc3RiBnByb3RvMw", [file_google_protobuf_timestamp]);

/**
 * @generated from message test.UserId
 */
export type UserId = Message<"test.UserId"> & {
  /**
   * @generated from oneof test.UserId.user_id
   */
  userId: {
    /**
     * @generated from field: string kafka_user_id = 1;
     */
    value: string;
    case: "kafkaUserId";
  } | {
    /**
     * @generated from field: int32 other_user_id = 2;
     */
    value: number;
    case: "otherUserId";
  } | {
    /**
     * @generated from field: test.MessageId another_id = 3;
     */
    value: MessageId;
    case: "anotherId";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message test.UserId.
 * Use `create(UserIdSchema)` to create a new message.
 */
export const UserIdSchema: GenMessage<UserId> = /*@__PURE__*/
  messageDesc(file_test_schemaregistry_serde_nested, 0);

/**
 * @generated from message test.MessageId
 */
export type MessageId = Message<"test.MessageId"> & {
  /**
   * @generated from field: string id = 1;
   */
  id: string;
};

/**
 * Describes the message test.MessageId.
 * Use `create(MessageIdSchema)` to create a new message.
 */
export const MessageIdSchema: GenMessage<MessageId> = /*@__PURE__*/
  messageDesc(file_test_schemaregistry_serde_nested, 1);

/**
 * @generated from message test.ComplexType
 */
export type ComplexType = Message<"test.ComplexType"> & {
  /**
   * @generated from oneof test.ComplexType.some_val
   */
  someVal: {
    /**
     * @generated from field: string one_id = 1;
     */
    value: string;
    case: "oneId";
  } | {
    /**
     * @generated from field: int32 other_id = 2;
     */
    value: number;
    case: "otherId";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: bool is_active = 3;
   */
  isActive: boolean;
};

/**
 * Describes the message test.ComplexType.
 * Use `create(ComplexTypeSchema)` to create a new message.
 */
export const ComplexTypeSchema: GenMessage<ComplexType> = /*@__PURE__*/
  messageDesc(file_test_schemaregistry_serde_nested, 2);

/**
 *
 * Complex message using nested protos and repeated fields
 *
 * @generated from message test.NestedMessage
 */
export type NestedMessage = Message<"test.NestedMessage"> & {
  /**
   * @generated from field: test.UserId user_id = 1;
   */
  userId?: UserId;

  /**
   * @generated from field: bool is_active = 2;
   */
  isActive: boolean;

  /**
   * @generated from field: repeated string experiments_active = 3;
   */
  experimentsActive: string[];

  /**
   * @generated from field: google.protobuf.Timestamp updated_at = 4;
   */
  updatedAt?: Timestamp;

  /**
   * @generated from field: test.Status status = 5;
   */
  status: Status;

  /**
   * @generated from field: test.ComplexType complex_type = 6;
   */
  complexType?: ComplexType;

  /**
   * @generated from field: map<string, string> map_type = 7;
   */
  mapType: { [key: string]: string };

  /**
   * @generated from field: test.NestedMessage.InnerMessage inner = 8;
   */
  inner?: NestedMessage_InnerMessage;
};

/**
 * Describes the message test.NestedMessage.
 * Use `create(NestedMessageSchema)` to create a new message.
 */
export const NestedMessageSchema: GenMessage<NestedMessage> = /*@__PURE__*/
  messageDesc(file_test_schemaregistry_serde_nested, 3);

/**
 * @generated from message test.NestedMessage.InnerMessage
 */
export type NestedMessage_InnerMessage = Message<"test.NestedMessage.InnerMessage"> & {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: repeated int32 ids = 2 [packed = true];
   */
  ids: number[];
};

/**
 * Describes the message test.NestedMessage.InnerMessage.
 * Use `create(NestedMessage_InnerMessageSchema)` to create a new message.
 */
export const NestedMessage_InnerMessageSchema: GenMessage<NestedMessage_InnerMessage> = /*@__PURE__*/
  messageDesc(file_test_schemaregistry_serde_nested, 3, 0);

/**
 * @generated from enum test.NestedMessage.InnerEnum
 */
export enum NestedMessage_InnerEnum {
  /**
   * @generated from enum value: ZERO = 0;
   */
  ZERO = 0,

  /**
   * @generated from enum value: ALSO_ZERO = 0;
   */
  ALSO_ZERO = 0,
}

/**
 * Describes the enum test.NestedMessage.InnerEnum.
 */
export const NestedMessage_InnerEnumSchema: GenEnum<NestedMessage_InnerEnum> = /*@__PURE__*/
  enumDesc(file_test_schemaregistry_serde_nested, 3, 0);

/**
 * @generated from enum test.Status
 */
export enum Status {
  /**
   * @generated from enum value: ACTIVE = 0;
   */
  ACTIVE = 0,

  /**
   * @generated from enum value: INACTIVE = 1;
   */
  INACTIVE = 1,
}

/**
 * Describes the enum test.Status.
 */
export const StatusSchema: GenEnum<Status> = /*@__PURE__*/
  enumDesc(file_test_schemaregistry_serde_nested, 0);

