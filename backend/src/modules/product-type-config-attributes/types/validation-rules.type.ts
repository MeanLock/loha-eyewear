import { ValidationRuleName } from "./validation-rule-name.enum";

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
}>