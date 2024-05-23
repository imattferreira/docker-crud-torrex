import type { Employee } from "~/@types/entities";
import request from "~/utils/request";
import type { Optional } from "~/@types/utils";

type UpInsertEmployee = Omit<Employee, "id" | "date">;

const endpoints = {
  create: (data: UpInsertEmployee) =>
    request.post<Employee>("/employees", data),
  findAll: () => request.get<Employee[]>("/employees"),
  findById: (id: number) => request.get<Optional<Employee>>(`/employees/${id}`),
  update: (id: number, data: UpInsertEmployee) =>
    request.put<Employee>(`/employees/${id}`, data),
  delete: (id: number) => request.delete<void>(`/employees/${id}`),
};

export default endpoints;
