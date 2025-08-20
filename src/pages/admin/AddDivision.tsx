import { AddDivisionModal } from "@/components/modules/admin/division/AddDivisionModal";

function AddDivision() {
    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">Tour Types</h1>
                <AddDivisionModal />
            </div>
        </div>
    );
}

export default AddDivision;