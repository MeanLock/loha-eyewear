export type ProductTypeAttributeTypeEnum =
  | "number"
  | "string"
  | "boolean"
  | "enum"
  | "date";

export enum ValidationRuleName {
  // Number
  IS_INT = "is_int",
  MIN_VALUE = "min_value",
  MAX_VALUE = "max_value",
  IS_STEP = "is_step",
  STEP = "step",
  IS_NEGATIVEABLE = "is_negativeable",
  UNIT_SYMBOL = "unit_symbol",
  // String
  MIN_LENGTH = "min_length",
  MAX_LENGTH = "max_length",
  UI_TYPE = "ui_type",
  IS_SPACEABLE = "is_spaceable",
  IS_UNIQUE = "is_unique",
  IS_UPPERCASE = "is_uppercase",
  IS_LOWERCASE = "is_lowercase",
  REGEX_PATTERN = "regex_pattern",
  // Boolean
  DEFAULT_VALUE = "default_value",
  // Date
  MIN_DATE = "min_date",
  MAX_DATE = "max_date",
  IS_DEFAULT_DATE_TODAY = "is_default_date_today",
  MAX_DAY_PAST = "max_day_past",
  MAX_DAY_FUTURE = "max_day_future",
  // Enum
  MIN_OPTIONS = "min_options",
  MAX_OPTIONS = "max_options",
  // All Types
  PLACEHOLDER = "placeholder",
  ERROR_MESSAGE = "error_message",
}

export type ValidationRules = Partial<{
  // Number
  [ValidationRuleName.IS_INT]: boolean;
  [ValidationRuleName.MIN_VALUE]: number;
  [ValidationRuleName.MAX_VALUE]: number;
  [ValidationRuleName.IS_STEP]: boolean;
  [ValidationRuleName.STEP]: number;
  [ValidationRuleName.IS_NEGATIVEABLE]: boolean;
  [ValidationRuleName.UNIT_SYMBOL]: string;

  // String
  [ValidationRuleName.MIN_LENGTH]: number;
  [ValidationRuleName.MAX_LENGTH]: number;
  [ValidationRuleName.UI_TYPE]: string;
  [ValidationRuleName.IS_SPACEABLE]: boolean;
  [ValidationRuleName.IS_UNIQUE]: boolean;
  [ValidationRuleName.IS_UPPERCASE]: boolean;
  [ValidationRuleName.IS_LOWERCASE]: boolean;
  [ValidationRuleName.REGEX_PATTERN]: string;

  // Date
  [ValidationRuleName.MIN_DATE]: string;
  [ValidationRuleName.MAX_DATE]: string;
  [ValidationRuleName.IS_DEFAULT_DATE_TODAY]: boolean;
  [ValidationRuleName.MAX_DAY_PAST]: number;
  [ValidationRuleName.MAX_DAY_FUTURE]: number;

  // Enum
  [ValidationRuleName.MIN_OPTIONS]: number;
  [ValidationRuleName.MAX_OPTIONS]: number;

  [ValidationRuleName.DEFAULT_VALUE]: any; // Nên để any vì boolean/string/number đều có default
  [ValidationRuleName.PLACEHOLDER]: string;
  [ValidationRuleName.ERROR_MESSAGE]: string;
}>;

export type AttributeEnumOption = {
  id: string;
  attribute_id: string;
  value: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type ProductTypeAttribute = {
  id: string;
  product_type_id: string;
  name: string;
  key: string;
  data_type: ProductTypeAttributeTypeEnum;
  is_required: boolean;
  sort_order: number;
  validation_rules: ValidationRules;
  created_at: string;
  updated_at: string;
  enum_options: AttributeEnumOption[];
};

export type ProductType = {
  id: string;
  name: string;
  prefix: string;
  created_at: string;
  updated_at: string;
  config_attributes: ProductTypeAttribute[];
};

export type ProductTypeBasic = {
  id: string;
  name: string;
  prefix: string;
  created_at: string;
  updated_at: string;
};

export const RULE_LABELS: Record<string, string> = {
  // Number
  [ValidationRuleName.IS_INT]: "Phải là số nguyên",
  [ValidationRuleName.MIN_VALUE]: "Giá trị tối thiểu",
  [ValidationRuleName.MAX_VALUE]: "Giá trị tối đa",
  [ValidationRuleName.IS_STEP]: "Chọn theo khoảng",
  [ValidationRuleName.STEP]: "Khoảng bước nhảy",
  [ValidationRuleName.IS_NEGATIVEABLE]: "Có thể âm",
  [ValidationRuleName.UNIT_SYMBOL]: "Đơn vị",

  // String
  [ValidationRuleName.MIN_LENGTH]: "Độ dài ký tự tối thiểu",
  [ValidationRuleName.MAX_LENGTH]: "Độ dài ký tự tối đa",
  [ValidationRuleName.UI_TYPE]: "Kiểu hiển thị",
  [ValidationRuleName.IS_SPACEABLE]: "Có thể chứa khoảng cách",
  [ValidationRuleName.IS_UNIQUE]: "Phải là độc nhất",
  [ValidationRuleName.IS_UPPERCASE]: "Phải viết hoa",
  [ValidationRuleName.IS_LOWERCASE]: "Phải viết thường",

  // Date
  [ValidationRuleName.MIN_DATE]: "Ngày sớm nhất có thể",
  [ValidationRuleName.MAX_DATE]: "Ngày trễ nhất có thể",
  [ValidationRuleName.IS_DEFAULT_DATE_TODAY]: "Mặc định là hôm nay",
  [ValidationRuleName.MAX_DAY_PAST]: "Khoảng cách so với ngày hôm nay về trước",
  [ValidationRuleName.MAX_DAY_FUTURE]: "Khoảng cách so với ngày hôm nay về sau",

  // Enum
  [ValidationRuleName.MIN_OPTIONS]: "Chọn tối thiểu",
  [ValidationRuleName.MAX_OPTIONS]: "Chọn tối đa",

  [ValidationRuleName.DEFAULT_VALUE]: "Giá trị mặc định", // Nên để any vì boolean/string/number đều có default
  placeholder: "Tiêu đề",
  error_message: "Câu báo lỗi",
  regex_pattern: "Kiểu ký tự",
};
