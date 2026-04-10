import { EyeDetail } from "@/types/prescription.type";

const MeasurementRow = ({
  label,
  detail,
  isAvg = false,
}: {
  label: string;
  detail: EyeDetail;
  isAvg?: boolean;
}) => (
  <div
    className={`grid grid-cols-4 py-3 px-4 ${isAvg ? "bg-slate-900 text-white rounded-xl my-1" : "border-b border-slate-100 text-slate-600"}`}
  >
    <span
      className={`text-xs font-bold uppercase self-center ${isAvg ? "text-blue-400" : "text-slate-400"}`}
    >
      {label}
    </span>
    <span className="text-center font-mono text-lg">
      {detail.sph > 0 ? `+${detail.sph.toFixed(2)}` : detail.sph.toFixed(2)}
    </span>
    <span className="text-center font-mono text-lg">
      {detail.cyl > 0 ? `+${detail.cyl.toFixed(2)}` : detail.cyl.toFixed(2)}
    </span>
    <span className="text-center font-mono text-lg">{detail.axis}°</span>
  </div>
);

export default MeasurementRow;
