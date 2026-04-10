"use-client";
import { Button } from "@/components/ui/button";
import { EyeFinalPrescript, EyePrescript } from "@/types/prescription.type";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MeasurementRow from "./components/MesurementRow";

const SOCKET_SERVER_URL = "http://localhost:5000";

export default function CreatePrescriptionOrderPage() {
  const [dataInputMode, setDataInputMode] = useState<"Automation" | "Manual">(
    "Automation",
  );

  const [data, setData] = useState<EyePrescript | null>(null);

  const [finalPrescript, setFinalPrescript] =
    useState<EyeFinalPrescript | null>(null);

  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, { transports: ["websocket"] });
    socket.on("NEW_MEASUREMENT", (incomingData: EyePrescript) => {
      setData(incomingData);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  if (!data)
    return (
      <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 mt-10">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium tracking-tight">
          Đang đợi tín hiệu từ máy đo Tomey...
        </p>
        <div>
          <Button onClick={() => setDataInputMode("Manual")}>
            Nhập thủ công
          </Button>
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden border border-slate-300">
      {/* Header Chuyên Nghiệp */}
      <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-end">
        <div>
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
            LoHa Eyewear System
          </span>
          <h1 className="text-3xl font-light text-slate-800 flex items-center gap-3">
            Refraction <span className="font-bold">Report</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Exam ID: {data.id} • {new Date(data.time).toLocaleString("vi-VN")}
          </p>
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Pupillary Distance
          </span>
          <div className="text-4xl font-light text-slate-800">
            {data.pd}
            <span className="text-sm font-bold text-blue-600 ml-1">mm</span>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Mắt Phải - OD */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full" /> RIGHT EYE{" "}
              <span className="text-slate-300 font-light text-sm">OD</span>
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">
              VD: {data.right_eye.vd}mm
            </span>
          </div>

          <div className="bg-slate-50/50 rounded-2xl p-2">
            <div className="grid grid-cols-4 px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              <span>Trial</span>
              <span className="text-center">Sphere</span>
              <span className="text-center">Cylinder</span>
              <span className="text-center">Axis</span>
            </div>
            <MeasurementRow label="1st" detail={data.right_eye.first_time} />
            <MeasurementRow label="2nd" detail={data.right_eye.second_time} />
            <MeasurementRow label="Final" detail={data.right_eye.avg} isAvg />
          </div>
        </div>

        {/* Mắt Trái - OS */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-8 bg-emerald-500 rounded-full" /> LEFT EYE{" "}
              <span className="text-slate-300 font-light text-sm">OS</span>
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">
              VD: {data.left_eye.vd}mm
            </span>
          </div>

          <div className="bg-slate-50/50 rounded-2xl p-2">
            <div className="grid grid-cols-4 px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              <span>Trial</span>
              <span className="text-center">Sphere</span>
              <span className="text-center">Cylinder</span>
              <span className="text-center">Axis</span>
            </div>
            <MeasurementRow label="1st" detail={data.left_eye.first_time} />
            <MeasurementRow label="2nd" detail={data.left_eye.second_time} />
            <MeasurementRow label="Final" detail={data.left_eye.avg} isAvg />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
        <button className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] active:scale-[0.98]">
          Ghi nhận đơn kính này
        </button>
        <button
          onClick={() => setData(null)}
          className="flex-1 bg-white border border-slate-200 text-slate-500 font-bold py-4 rounded-2xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all active:scale-[0.98]"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
}
