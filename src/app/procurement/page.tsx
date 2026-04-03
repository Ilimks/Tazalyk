import { ProcurementTable } from "@/widgets/Procurement/ProcurementTable";
import { ProcurementFiles } from "@/widgets/Procurement/ProcurementFiles";


export default function Procurement() {
  return (
      <main>
        <ProcurementTable/>
        <ProcurementFiles/>
      </main>
  );
}