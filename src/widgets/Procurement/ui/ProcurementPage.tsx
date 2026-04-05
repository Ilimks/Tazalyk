import { ProcurementFiles } from "./components/ProcurementFiles"
import { ProcurementTable } from "./components/ProcurementTable"

export const ProcurementPage: React.FC = () => {
    return (
        <div>
            <ProcurementTable/>
            <ProcurementFiles/>
        </div>
    )
}