// @ts-nocheck
"use client";

import { useFormContext } from "react-hook-form";
import { NumberRules } from "./NumberRules";
import { StringRules } from "./StringRules";
import { BooleanRules } from "./BooleanRules";
import { DateRules } from "./DateRules";
import { EnumRules } from "./EnumRules";
import { CommonRules } from "./CommonRules";

export function ValidationRules({ index }: { index: number }) {
    const { watch } = useFormContext();
    const dataType = watch(`attributes.${index}.data_type`);

    return (
        <div className="space-y-4">
            <h4 className="text-sm font-semibold">Cấu hình Validation (tùy chọn)</h4>

            {dataType === "number" && <NumberRules index={index} />}
            {dataType === "string" && <StringRules index={index} />}
            {dataType === "boolean" && <BooleanRules index={index} />}
            {dataType === "date" && <DateRules index={index} />}
            {dataType === "enum" && <EnumRules index={index} />}

            <CommonRules index={index} />
        </div>
    );
}
