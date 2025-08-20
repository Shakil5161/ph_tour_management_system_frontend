import { AddTourForm } from "@/components/modules/admin/tour/AddTourForm";

function AddTour() {

    return (
        <div className="w-full max-w-7xl mx-auto px-5 ">
            <div className=" my-8">
                <h1 className="text-xl font-semibold">Tour Types</h1>
                <AddTourForm />
            </div>
        </div>
    );
}

export default AddTour;