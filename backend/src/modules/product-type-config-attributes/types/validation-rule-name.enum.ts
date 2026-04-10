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