import React, { FC } from "react";
import {
  Calendar,
  User,
  FileText,
  Users,
  Activity,
  Hash,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

interface NotificationProps {
  row: any;
}

const PushNotificationView: FC<NotificationProps> = ({ row }) => {
  const formatDate = (dateArray: number[] | null) => {
    if (!dateArray) return "N/A";
    const [year, month, day, hour, minute] = dateArray;
    return new Date(year, month - 1, day, hour, minute).toLocaleString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "INACTIVE":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  return (
    <div className="flex flex-col gap-6 p-1 max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {row.title}
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>Created: {formatDate(row.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
        <div className="flex items-center gap-2 mb-2 text-slate-400">
          <FileText size={16} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Description
          </span>
        </div>
        <div
          className="text-slate-600 text-sm leading-relaxed prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: row.description }}
        />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Users size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Students ({row.students?.length || 0})
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {row.students && row.students.length > 0 ? (
              row.students.map((student: any, index: number) => (
                <div
                  key={student.studentId || index}
                  className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
                    {student.firstName?.[0]}
                    {student.lastName?.[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                      {student.firstName} {student.middleName}{" "}
                      {student.lastName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      #{student.studentId}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-sm text-slate-400 italic">
                No students assigned
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Activity size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                File
              </span>
            </div>
            <div className="space-y-2">
              {row?.file?.path ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                  <Image
                    src={row.file.path}
                    alt="Notification file"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-48 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 bg-slate-50">
                  <div className="text-center">
                    <FileText size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No file attached</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {row.url && (
            <a
              href={row.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
            >
              <ExternalLink size={16} />
              View Resource
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PushNotificationView;
