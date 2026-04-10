"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, PlusCircle, Info } from "lucide-react";

export function QuantityConfigForm({ form }: { form: UseFormReturn<any> }) {
  const { control, register, setValue, watch, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "quantity_configs" });

  const handleSetBase = (index: number) => {
    fields.forEach((_, i) => {
      setValue(`quantity_configs.${i}.is_base_unit`, i === index);
      if (i === index) setValue(`quantity_configs.${i}.conversion_rate`, 1); // Đơn vị gốc rate luôn là 1
    });
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg bg-blue-50/20">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Cấu hình đơn vị & Quy đổi</h3>
        <Button type="button" variant="outline" size="sm" onClick={() => append({ unit_name: "", is_base_unit: fields.length === 0, conversion_rate: 1, is_integer_only: true })}>
          <PlusCircle className="w-4 h-4 mr-2" /> Thêm đơn vị
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-lg border shadow-sm">
            <div className="col-span-3">
              <Input {...register(`quantity_configs.${index}.unit_name`)} placeholder="Tên đơn vị" />
            </div>
            <div className="col-span-3">
              <Input 
                type="number" 
                step="any"
                disabled={watch(`quantity_configs.${index}.is_base_unit`)}
                {...register(`quantity_configs.${index}.conversion_rate`, { valueAsNumber: true })} 
                placeholder="Rate"
              />
            </div>
            <div className="col-span-2 flex flex-col items-center gap-1">
              <label className="text-[10px] uppercase font-bold">Gốc</label>
              <Checkbox 
                checked={watch(`quantity_configs.${index}.is_base_unit`)} 
                onCheckedChange={() => handleSetBase(index)} 
              />
            </div>
            <div className="col-span-2 flex flex-col items-center gap-1">
              <label className="text-[10px] uppercase font-bold">Số nguyên</label>
              <Checkbox 
                checked={watch(`quantity_configs.${index}.is_integer_only`)} 
                onCheckedChange={(val) => setValue(`quantity_configs.${index}.is_integer_only`, val)} 
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {errors.quantity_configs && <p className="text-red-500 text-xs italic">{(errors.quantity_configs as any).message}</p>}
    </div>
  );
}