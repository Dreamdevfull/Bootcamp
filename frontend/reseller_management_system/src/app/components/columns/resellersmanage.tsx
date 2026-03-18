"use client"
import { ColumnDef } from '@tanstack/react-table';
import ApprovalButton from '../ui/button/approval/approved';
import BockButton from '../ui/button/approval/bock';
import RejectedButton from '../ui/button/approval/rejected';

interface Approval {
  id: number;
  name: string;
  email: string; //
  phone: string;
  status: string;
  address: string; //
  created_at: string;
}

export const ResellersManage: ColumnDef<Approval>[] =  [
  // {
  //   id: "index",
  //   header: () => <div className="text-center">ลำดับ</div>,
  //   cell: ({ row, table }) => {
  //     const pageIndex = table.getState().pagination.pageIndex;
  //     const pageSize = table.getState().pagination.pageSize;
  //     const pageRowIndex = table.getRowModel().rows.findIndex(r => r.id === row.id);
  //     return (
  //       <div className="text-center">
  //         {pageIndex * pageSize + pageRowIndex + 1}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "create_at",
    header: () => <div className="text-center">วันที่สมัคร</div>,
    cell: ({ row }) => {
      const date = row.original.created_at;
      console.log(date);
      return (
        <div className='text-center'>
          {new Date(date).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "create_at",
  //   header: () => <div className="text-center">วันที่สมัคร</div>,
  //   cell: ({ row }) => {
  //     const date = row.original.created_at;
  //     console.log(date);
  //     return (
  //       <div className='text-center'>
  //         {new Date(date).toLocaleDateString("th-TH")}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "name",
    header: () => <div className="text-center">ชื่อ-นามสกุล</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-center">ข้อมูลติดต่อ</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: () => <div className="text-center">ชื่อร้าน</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">สถานะ</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");

      let text = "";
      let color = "";

      if (status === "pending") {
        text = "รอดำเนินการ";
        color = "text-[#633806] border border-[#fac775] bg-[#faeeda] rounded-md px-2 py-1";
      } else if (status === "approved") {
        text = "อนุมัติแล้ว";
        color = "text-[#085041] border border-[#9fe1cb] bg-[#e1f5ee] rounded-md px-2 py-1";
      } else if (status === "rejected") {
        text = "ถูกปฏิเสธ";
        color = "text-[#791f1f] border border-[#f7c1c1] bg-[#fcebeb] rounded-md px-2 py-1";
      }

      return (
        <div className="text-center">
          <span className={color}>{text}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">จัดการ</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      if (status === "pending") {
        return (
          <div className="flex gap-2 justify-center">
            <ApprovalButton id={row.original.id} />
            <RejectedButton id={row.original.id} />
          </div>
        );
      } else if (status === "approved") {
        return (
          <div className="flex justify-center">
            <BockButton id={row.original.id}/>
          </div>
        );
      } else {
        return null;
      }

    },
  }
]