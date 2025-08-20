import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useCreateTourMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

export function AddTourForm() {

  const [images, setImages] = useState<(File | FileMetadata)[]>([])
  
  const { data: divisionData, isLoading: divisionLoading } = useGetDivisionQuery(undefined);
  const { data: tourTypeData } = useGetTourTypesQuery(undefined)

  const [ addData ] = useCreateTourMutation();

  const divisionOptions = divisionData?.map( (item: {_id: string, name: string}) => ({
      value: item._id,
      label: item.name,
    })
  )

  const tourTypeOptions = tourTypeData?.data?.map( (tourType: {_id: string, name: string}) => ({
      value: tourType._id,
      label: tourType.name,
    })
  )


  // console.log(tourTypeOptions, "tourTypeOptions")

  const form = useForm({
    defaultValues: {
        title: "",
        description: "",
        division: "",
        tourType: "",
        startDate: "",
        endDate: "",
        included: [{value: ""}],
        excluded: [{value: ""}],
    }
  });


  const { fields: includedFields, append: appendIncluded, remove: removeIncluded } = useFieldArray({
    control: form.control,
    name: "included",
  })

  const { fields: excludedFields, append: appendExcluded, remove: removeExcluded } = useFieldArray({
    control: form.control,
    name: "excluded",
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item: {value: string}) => item.value),
      excluded: data.excluded.map((item: {value: string}) => item.value),
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(tourData));
    // formData.append("files", "shakil.jpg")
    images.forEach((image) => formData.append("files", image as File))
    console.log(formData.get("files"), "Data from Add tour modal", tourData)

    try {
      
      const res = await addData(formData).unwrap();
console.log(res, "res")
      if(res.success){
        console.log(res, "Create Tour")
      }
      
      
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <Card className="w-full max-w-4xl mx-auto px-5 mt-16">
        <CardHeader>
          <CardTitle>Add New Tour</CardTitle>
          <CardDescription>Add a new tour to the system</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
          <form
            className="space-y-5"
            id="add-tour-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Name</FormLabel>
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
            <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem className="flex-1 ">
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={divisionLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisionOptions?.map(
                            (item: { label: string; value: string }) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tourType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Tour Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tourTypeOptions?.map(
                            (option: { value: string; label: string }) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            <div className="flex gap-5">
               <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                    <FormLabel>Tour Start Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                " pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(new Date(field.value), "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={(date) => {
                            if (date) {
                                field.onChange(date.toISOString());
                            } else {
                                field.onChange("");
                            }
                            }}
                            disabled={(date) => date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )}
                            captionLayout="dropdown"
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />
               <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                    <FormLabel>Tour End Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(new Date(field.value), "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={(date) => {
                            if (date) {
                                field.onChange(date.toISOString());
                            } else {
                                field.onChange("");
                            }
                            }}
                            disabled={(date) => date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )}
                            captionLayout="dropdown"
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <div className="">
                <MultipleImageUploader onChange={setImages}/>
            </div>

            <div className="border-t border-muted w-full">
              <div>
                <div className="flex justify-between mt-5">
                  <p className="font-semibold">Included</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => appendIncluded({value: ""})}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  {
                    includedFields.map((item, index) => (
                      <div className="flex gap-2" key={item.id}>
                      <FormField
                        control={form.control}
                        name={`included.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                      onClick={() => removeIncluded(index)}
                        variant="destructive"
                        className="!bg-red-700"
                        size="icon"
                        type="button"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                    ))
                  }  
                </div>

              </div>
            </div>
            <div className="border-t border-muted w-full">
              <div>
                <div className="flex justify-between mt-5">
                  <p className="font-semibold">Excluded</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => appendExcluded({value: ""})}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  {
                    excludedFields.map((item, index) => (
                      <div className="flex gap-2" key={item.id}>
                      <FormField
                        control={form.control}
                        name={`excluded.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                      onClick={() => removeExcluded(index)}
                        variant="destructive"
                        className="!bg-red-700"
                        size="icon"
                        type="button"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                    ))
                  }  
                </div>

              </div>
            </div>


          </form>
          
        </Form>

          </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" form="add-tour-form">
            Create Tour
          </Button>
        </CardFooter>
      </Card>
  );
}