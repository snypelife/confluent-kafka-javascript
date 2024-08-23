// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file confluent/meta.proto (package confluent, syntax proto3)
/* eslint-disable */

import type { GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { EnumOptions, EnumValueOptions, FieldOptions, FileOptions, MessageOptions } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file confluent/meta.proto.
 */
export const file_confluent_meta: GenFile = /*@__PURE__*/
  fileDesc("ChRjb25mbHVlbnQvbWV0YS5wcm90bxIJY29uZmx1ZW50In0KBE1ldGESCwoDZG9jGAEgASgJEisKBnBhcmFtcxgCIAMoCzIbLmNvbmZsdWVudC5NZXRhLlBhcmFtc0VudHJ5EgwKBHRhZ3MYAyADKAkaLQoLUGFyYW1zRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ATpLCglmaWxlX21ldGESHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMYwAggASgLMg8uY29uZmx1ZW50Lk1ldGFSCGZpbGVNZXRhOlQKDG1lc3NhZ2VfbWV0YRIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxjACCABKAsyDy5jb25mbHVlbnQuTWV0YVILbWVzc2FnZU1ldGE6TgoKZmllbGRfbWV0YRIdLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE9wdGlvbnMYwAggASgLMg8uY29uZmx1ZW50Lk1ldGFSCWZpZWxkTWV0YTpLCgllbnVtX21ldGESHC5nb29nbGUucHJvdG9idWYuRW51bU9wdGlvbnMYwAggASgLMg8uY29uZmx1ZW50Lk1ldGFSCGVudW1NZXRhOlsKD2VudW1fdmFsdWVfbWV0YRIhLmdvb2dsZS5wcm90b2J1Zi5FbnVtVmFsdWVPcHRpb25zGMAIIAEoCzIPLmNvbmZsdWVudC5NZXRhUg1lbnVtVmFsdWVNZXRhQg5aDC4uL2NvbmZsdWVudGIGcHJvdG8z", [file_google_protobuf_descriptor]);

/**
 * @generated from message confluent.Meta
 */
export type Meta = Message<"confluent.Meta"> & {
  /**
   * @generated from field: string doc = 1;
   */
  doc: string;

  /**
   * @generated from field: map<string, string> params = 2;
   */
  params: { [key: string]: string };

  /**
   * @generated from field: repeated string tags = 3;
   */
  tags: string[];
};

/**
 * Describes the message confluent.Meta.
 * Use `create(MetaSchema)` to create a new message.
 */
export const MetaSchema: GenMessage<Meta> = /*@__PURE__*/
  messageDesc(file_confluent_meta, 0);

/**
 * @generated from extension: confluent.Meta file_meta = 1088;
 */
export const file_meta: GenExtension<FileOptions, Meta> = /*@__PURE__*/
  extDesc(file_confluent_meta, 0);

/**
 * @generated from extension: confluent.Meta message_meta = 1088;
 */
export const message_meta: GenExtension<MessageOptions, Meta> = /*@__PURE__*/
  extDesc(file_confluent_meta, 1);

/**
 * @generated from extension: confluent.Meta field_meta = 1088;
 */
export const field_meta: GenExtension<FieldOptions, Meta> = /*@__PURE__*/
  extDesc(file_confluent_meta, 2);

/**
 * @generated from extension: confluent.Meta enum_meta = 1088;
 */
export const enum_meta: GenExtension<EnumOptions, Meta> = /*@__PURE__*/
  extDesc(file_confluent_meta, 3);

/**
 * @generated from extension: confluent.Meta enum_value_meta = 1088;
 */
export const enum_value_meta: GenExtension<EnumValueOptions, Meta> = /*@__PURE__*/
  extDesc(file_confluent_meta, 4);
