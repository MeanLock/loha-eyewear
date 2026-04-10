import { Badge } from "@/components/ui/badge";
import { ProductTypeAttribute, RULE_LABELS } from "@/types/product-type.type";

import React from "react";

interface Props {
  attribute: ProductTypeAttribute;
}

const ProductTypeAttributeCard: React.FC<Props> = ({ attribute }) => {
  const formatValidationRuleNames = (key: string) => {
    return RULE_LABELS[key] || key;
  };

  return (
    <div
      key={attribute.id}
      className="flex flex-col rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="space-y-1">
          <p className="font-bold text-sm">{attribute.name}</p>
          <code className="text-[10px] bg-muted px-1 py-0.5 rounded text-muted-foreground">
            {attribute.key}
          </code>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className="text-[10px] px-1 h-5">{attribute.data_type}</Badge>
          {attribute.is_required && (
            <span className="text-[10px] text-destructive font-medium">
              Bắt buộc
            </span>
          )}
        </div>
      </div>

      {/* Validation Rules gọn gàng hơn */}
      {Object.keys(attribute.validation_rules).length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5 border-t pt-2">
          {Object.entries(attribute.validation_rules).map(([key, value]) => (
            <div
              key={key}
              className="text-[10px] text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded-md"
            >
              <span className="opacity-70">
                {formatValidationRuleNames(key)}:
              </span>{" "}
              {String(value)}
            </div>
          ))}
        </div>
      )}

      {/* Enum Options */}
      {attribute.data_type === "enum" && (
        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] font-semibold text-muted-foreground">
            Tùy chọn:
          </p>
          <div className="flex flex-wrap gap-1">
            {attribute.enum_options.map((opt) => (
              <Badge
                key={opt.id}
                variant="secondary"
                className="text-[9px] py-0 px-1.5 font-normal"
              >
                {opt.value}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTypeAttributeCard;
