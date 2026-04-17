"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductTypeService } from "@/services/product-types/product-type.service";
import { AttributeFields } from "./components/attribute-fields"; // Đảm bảo đúng path
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { generateAttributeSchema } from "./components/dynamic-schema";
import { getFinalSchema } from "./components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GeneralInformation } from "./components/general-info-form";
import { ProductService } from "@/services/product/product.service";
import { ProductImages } from "./components/product-images";
import { QuantityConfigForm } from "./components/quantity-config-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();
  const [selectedProductTypeId, setSelectedProductTypeId] = useState<
    string | null
  >(null);

  const [isVariant, setIsVariant] = useState(false);
  // --- QUERIES ---
  // Thiếu query này nè bro: lấy danh sách Types để đổ vào <select>
  const { data: listTypes } = useQuery({
    queryKey: ["product-types-basics"],
    queryFn: () => ProductTypeService.getAllProductTypesBasic(),
  });

  const { data: typeDetail } = useQuery({
    queryKey: ["product-type", selectedProductTypeId],
    queryFn: () =>
      ProductTypeService.getProductTypeById(selectedProductTypeId as string),
    enabled: !!selectedProductTypeId,
  });

  const { data: parentProducts } = useQuery({
    queryKey: ["parent-products", selectedProductTypeId],
    queryFn: () =>
      ProductService.findParentProductsByType(selectedProductTypeId as string),
    enabled: !!selectedProductTypeId,
  });

  // --- SCHEMA LOGIC ---
  const finalSchema = useMemo(() => {
    // Luôn luôn phải trả về một schema hợp lệ để zodResolver không bị die
    const dynamicSchema = typeDetail
      ? generateAttributeSchema(typeDetail.config_attributes)
      : z.object({});
    return getFinalSchema(dynamicSchema);
  }, [typeDetail]);

  // --- FORM SETUP ---
  const form = useForm({
    resolver: zodResolver(finalSchema),
    mode: "all", // "all" để nó validate cả khi blur lẫn khi nhập
    defaultValues: {
      name: "",
      description: "",
      image_url: "",
      listed_price: 0,
      minimum_price: 0,
      price_after_tax: false,
      min_order_range_count: 1,
      is_expirable: false,
      minimum_saleable_range_count: 0,
      attribute_values: {},
    },
  });

  // Reset/Gán giá trị mặc định cho attributes khi đổi Type
  //   useEffect(() => {
  //     if (typeDetail) {
  //       const defaultAttrValues: any = {};
  //       typeDetail.config_attributes.forEach((attr) => {
  //         defaultAttrValues[attr.key] =
  //           attr.validation_rules.default_value ??
  //           (attr.data_type === "boolean" ? false : "");
  //       });
  //       // Chỉ reset phần attribute_values để giữ nguyên các phần name, price đã nhập
  //       form.setValue("attribute_values", defaultAttrValues);
  //     }
  //   }, [typeDetail, form]);

  useEffect(() => {
    if (typeDetail) {
      const defaultAttrValues: Record<string, any> = {};

      typeDetail.config_attributes.forEach((attr) => {
        const rules = attr.validation_rules;

        // Xác định giá trị khởi tạo an toàn dựa trên data_type
        switch (attr.data_type) {
          case "boolean":
            defaultAttrValues[attr.key] = rules.default_value ?? false;
            break;
          case "enum":
            defaultAttrValues[attr.key] = []; // Enum phải là mảng rỗng, không được undefined
            break;
          case "number":
            defaultAttrValues[attr.key] = rules.default_value ?? 0;
            break;
          case "date":
            // Nếu có rule default là hôm nay
            defaultAttrValues[attr.key] = rules.is_default_date_today
              ? new Date().toISOString().split("T")[0]
              : (rules.default_value ?? "");
            break;
          default:
            defaultAttrValues[attr.key] = rules.default_value ?? "";
        }
      });

      // Reset toàn bộ section attribute_values để xóa key cũ và nhận key mới
      form.setValue("attribute_values", defaultAttrValues, {
        shouldDirty: true,
      });
    }
  }, [typeDetail, form]);

  // --- MUTATION ---
  const createMutation = useMutation({
    mutationFn: (payload: any) => ProductService.createProduct(payload),
    onSuccess: () => {
      toast.success("Tạo sản phẩm thành công!");
      router.push("/products");
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message ?? "Tạo sản phẩm thất bại";
      toast.error(message);
    },
  });

  // --- HANDLERS ---
  const onProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductTypeId(e.target.value || null);
  };

  const onSubmit = async (values: any) => {
    if (!typeDetail) return;

    // Transform attribute_values thành format mảng mà backend expect
    const formattedAttributes = typeDetail.config_attributes.map((attr) => ({
      attribute: {
        id: attr.id,
        name: attr.name,
        key: attr.key,
        data_type: attr.data_type,
        sort_order: attr.sort_order,
      },
      value: values.attribute_values[attr.key],
    }));
    // Lọc sạch mảng ảnh phụ, chỉ giữ lại những gì Backend cần
    const cleanProductImages =
      values.product_images?.map((img: any) => ({
        sort_order: img.sort_order,
        image_url: img.image_url, // Đây chính là public_id
        is_primary: img.is_primary,
      })) || [];

    const finalPayload = {
      ...values,
      product_type: {
        id: typeDetail.id,
        name: typeDetail.name,
        prefix: typeDetail.prefix,
      },
      status_id: 1,
      attribute_values: formattedAttributes,
      // product_images và quantity_configs đã được form.register qua useFieldArray
      product_images: cleanProductImages, // Gửi bản đã lọc sạch
      quantity_configs: values.quantity_configs ?? [],
    };

    createMutation.mutate(finalPayload);
    console.log("Final Payload to submit:", finalPayload);
  };

  return (
    <div className="w-full mx-auto p-2">
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("Validation Errors:", errors); // Nó sẽ in ra lý do tại sao không submit được
        })}
        className="space-y-6 bg-white p-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Tạo Sản Phẩm Mới</h1>

        {/* --- PHẦN 1: CƠ BẢN --- */}
        <GeneralInformation form={form} />

        {/* --- PHẦN 2: CHỌN LOẠI --- */}
        <div className="space-y-2">
          <label className="text-sm font-bold">Loại sản phẩm</label>
          <select
            onChange={onProductTypeChange}
            className="w-full p-2 border rounded-md bg-slate-50"
            value={selectedProductTypeId || ""}
          >
            <option value="">-- Chọn loại sản phẩm --</option>
            {listTypes?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- PHẦN 3: ATTRIBUTES ĐỘNG --- */}
        {typeDetail && (
          <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-primary/40">
            <h2 className="font-bold mb-4 text-primary">
              Cấu hình thuộc tính: {typeDetail.name}
            </h2>
            <AttributeFields
              attributes={typeDetail.config_attributes}
              form={form}
            />
          </div>
        )}

        {/* --- PHẦN 4: CÁC THÔNG TIN KHÁC */}
        {/* Đầu tiên hỏi có phải sản phẩm cha không, hay là sản phẩm con */}
        {/* Nếu là sản phẩm con thì show thêm dropdown để chọn sản phẩm cha */}
        <div className="space-y-6 pt-10 border-t">
          {selectedProductTypeId &&
            parentProducts &&
            parentProducts.length > 0 && (
              <div className="flex flex-col gap-4 p-4 border rounded-xl bg-orange-50/10">
                <h2 className="text-xl font-bold">Phân loại & Liên kết</h2>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!isVariant}
                      onChange={() => {
                        setIsVariant(false);
                        form.setValue("parent_id", null);
                      }}
                    />
                    Sản phẩm cha (Sản phẩm gốc)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={isVariant}
                      onChange={() => setIsVariant(true)}
                    />
                    Sản phẩm biến thể (Variant)
                  </label>
                </div>

                {isVariant && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className="text-sm font-semibold">
                      Chọn sản phẩm cha *
                    </label>
                    <select
                      {...form.register("parent_id")}
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      <option value="">-- Chọn sản phẩm cha --</option>
                      {parentProducts?.map((p: any) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sku || p.prefix})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

          <ProductImages form={form} />

          <QuantityConfigForm form={form} />
        </div>
        {/* Upload thêm các ảnh product-images khác */}

        {/* Cấu hình số lượng */}
        <Button
          type="submit"
          className="w-full py-6 text-lg"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Đang tạo..." : "Tạo Sản Phẩm"}
        </Button>
      </form>
    </div>
  );
}
