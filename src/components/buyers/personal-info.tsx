import { Pencil } from "lucide-react";

interface Props {
  buyer: {
    firstName: string;
    lastName: string;
    universityEmail: string;
    studentId: string;
    phoneNumber: string;
  };
}

export default function ProfileCard({ buyer }: Props) {
  return (
    <div className="rounded-lg border border-neutral-400 p-4 space-y-5">
      {/* Header: Personal Info */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm-bold text-neutral-800">Personal Info</h2>
        <button
          type="button"
          onClick={() => alert("Edit profile coming soon")} 
          className="text-neutral-800 active:text-neutral-500 transition"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-y-5 text-xs-semibold">
        <div>
          <p className="text-neutral-600">Name</p>
          <p className="text-neutral-800 text-sm-semibold truncate">
            {buyer.firstName} {buyer.lastName}
          </p>
        </div>
        <div>
          <p className="text-neutral-600">Email</p>
          <p className="text-neutral-800 text-sm-semibold truncate">{buyer.universityEmail}</p>
        </div>
        <div>
          <p className="text-neutral-600">Student ID</p>
          <p className="text-neutral-800 text-sm-semibold truncate">{buyer.studentId}</p>
        </div>
        <div>
          <p className="text-neutral-600">Phone</p>
          <p className="text-neutral-800 text-sm-semibold truncate">{buyer.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}
