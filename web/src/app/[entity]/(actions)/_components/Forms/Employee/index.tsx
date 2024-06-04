"use client";
import type { Employee } from "~/@types/entities";
import type { FormProps } from "../shared/types";
import Input from "../shared/Input";
import Form from "../shared/Form";
import Submit from "../shared/Submit";
import GoBack from "../shared/GoBack";
import { useForm } from "react-hook-form";
import api from "~/api";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { User } from "lucide-react";

const Modal = dynamic(() => import("./ImageUploadModal"), { ssr: false });

interface EmployeeFormProps extends FormProps<Employee> {}

const formatImage = (imageId: number) => "http://192.168.6.197:8080" + imageId;

function EmployeeForm({ data }: EmployeeFormProps) {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(() => {
    if (!data?.idImage) {
      return "";
    }

    return formatImage(data.id);
  });
  const { register, handleSubmit } = useForm<Employee>({
    defaultValues: {
      name: data?.name,
      date: data?.date,
      idUnit: data?.idUnit,
      idSector: data?.idSector,
      id: data?.id,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (formData: Employee) => {
    try {
      if (data) {
        await api.employees.update(formData.id, formData);
      } else {
        await api.employees.create(formData);
      }

      router.push("/colaboradores");
      router.refresh();
    } catch (err) {
      // do nothing
    }
  };

  function onClose() {
    setModalOpen(false);
  }

  function onUpload() {
    setAvatarUrl(formatImage(data!.id));
  }

  return (
    <>
      {isModalOpen && (
        <Suspense>
          <Modal employeeId={data!.id} onUpload={onUpload} onClose={onClose} />
        </Suspense>
      )}
      <div className="p-4 bg-emerald-600 rounded-full">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt="Avatar do usuário"
            height={20}
            width={20}
            className="rounded-full"
          />
        ) : (
          <User size="20" />
        )}
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Nome" placeholder="John Doe" {...register("name")} />
        <Input
          label="Data de nascimento"
          placeholder="18/11/2000"
          type="date"
          {...register("date")}
        />
        <div className="flex items-center gap-x-4">
          <Input
            label="ID do setor"
            placeholder="131231"
            type="number"
            {...register("idSector")}
          />
          <Input
            label="ID da unidade"
            placeholder="131231"
            type="number"
            {...register("idUnit")}
          />
        </div>
        <div className="self-end flex gap-x-3">
          <GoBack />
          <Submit type={data ? "update" : "create"} />
        </div>
      </Form>
    </>
  );
}

export default EmployeeForm;
