"use client";
import { Button } from "@/components/ui/button";
import { ClosedCaption, PlusCircle, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StringValidation } from "zod/v3";

interface Tab {
  id: string;
  order: number;
  title: string;
}

function CreateOrder() {
  const searchParams = useSearchParams();
  const [tabCount, setTabCount] = React.useState(0);
  const [tabs, setTabs] = React.useState<Tab[]>([]);
  const [activeTab, setActiveTab] = React.useState<number | null>(null);

  const handleAddTab = useCallback(() => {
    const newOrder = tabCount + 1;
    const newTab: Tab = {
      id: `order-${Date.now()}`,
      order: newOrder,
      title: `Đơn hàng ${newOrder}`,
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setTabCount((prevCount) => prevCount + 1);
    setActiveTab(newOrder); // Tự động switch sang tab mới
  }, [tabCount]);

  const handleRemoveTab = useCallback(
    (orderToRemove: number) => {
      (setTabCount((prevCount) => prevCount - 1),
        setTabs((prevTabs) => {
          const filtered = prevTabs.filter((t) => t.order !== orderToRemove);

          const reOrdered = filtered.map((t, index) => ({
            ...t,
            order: index + 1,
            title: `Đơn hàng ${index + 1}`,
          }));

          // Xử lý logic nhảy Tab Active
          if (activeTab === orderToRemove) {
            if (reOrdered.length > 0) {
              const oldIndex = prevTabs.findIndex(
                (t) => t.order === orderToRemove,
              );
              const nextActiveOrder =
                reOrdered[oldIndex - 1]?.order || reOrdered[0].order;
              setActiveTab(nextActiveOrder);
            } else {
              setActiveTab(null);
            }
          } else if (activeTab && activeTab > orderToRemove) {
            // Nếu xóa tab nằm trước tab đang active, phải giảm chỉ số activeTab xuống 1
            setActiveTab(activeTab - 1);
          }

          return reOrdered;
        }));
    },
    [activeTab],
  );

  return (
    <div className="w-full h-full bg-background pt-2 flex flex-col">
      {/* Header Tabs */}
      <div className="w-full flex items-end">
        <div className="max-w-11/12 overflow-x-auto flex items-end gap-1 overflow-y-hidden no-scrollbar">
          <AnimatePresence mode="popLayout">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.order;
              return (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setActiveTab(tab.order)}
                  className={`relative flex items-center gap-2 text-sm py-2 transition-colors cursor-pointer whitespace-nowrap duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-primary/60 hover:text-primary"
                  }`}
                >
                  {/* Background Animation cho Tab Active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-t-xl z-0"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <div className="relative z-10 px-2 flex items-center justify-between">
                    <p className="font-medium mr-6">{tab.title}</p>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleRemoveTab(tab.order)}
                      className="group-hover:opacity-100"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <Button
          onClick={handleAddTab}
          variant="ghost"
          size="icon"
          className="ml-2 mb-1 hover:bg-transparent text-primary/60 hover:text-primary"
        >
          <PlusCircle size={20} />
        </Button>
      </div>

      {/* Content Area */}
      <div className="w-full flex-1 flex flex-col">
        {/* Thanh Header xanh có animation màu sắc */}
        <motion.div
          animate={{
            backgroundColor: activeTab ? "var(--primary)" : "#ffffff",
          }}
          className="w-full flex items-center px-8 bg-primary z-10"
        >
          <p className="text-white text-sm py-2 font-medium">
            Thông tin đơn hàng
          </p>
        </motion.div>

        {/* Vùng nội dung có hiệu ứng Fade In / Slide khi đổi tab */}
        <div className="flex-1 overflow-hidden bg-white border-t relative">
          <AnimatePresence
            key={tabs.find((t) => t.order === activeTab)?.id}
            mode="wait"
          >
            <motion.div
              key={tabs.find((t) => t.order === activeTab)?.id} // Key thay đổi giúp Framer Motion nhận diện để trigger animation
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 p-8"
            >
              {activeTab ? (
                <div>
                  <h2 className="text-xl font-bold">
                    Nội dung của{" "}
                    {tabs.find((t) => t.order === activeTab)?.title}
                  </h2>
                  {/* Render Form của bạn ở đây */}
                </div>
              ) : (
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  Vui lòng tạo đơn hàng mới
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
