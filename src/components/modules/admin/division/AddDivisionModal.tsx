import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateDivisionMutation } from "@/redux/features/division/division.api";
import type { ICreateDivision } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddDivisionModal() {

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [ createDivision ] = useCreateDivisionMutation();
   
  const form = useForm({
    defaultValues: {
        name: "",
        description: "",
    }
  });


  const onSubmit = async (data: ICreateDivision) => {
    const formData = new FormData();;

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    try {
      const res = await createDivision(formData).unwrap();
      toast.success("DIvision Added");
      setOpen(false);
      console.log("create Division", res)
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Tour Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tour Type</DialogTitle>
          </DialogHeader>
            <Form {...form}>
          <form
            className="space-y-5"
            id="add-division"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Tour Type Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl className="border p-2">
                    <textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <SingleImageUploader onChange={setImage}/>
        </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={!image} type="submit" form="add-division">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}