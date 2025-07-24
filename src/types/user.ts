import { RoutineDto } from "./workout"


export interface UserRoutineDto {
  routine: RoutineDto
  enabled: boolean
}

export interface UserDto {
  _id: string
  handle: string
  name: string
  email?: string
  routines?: UserRoutineDto[]
  createdAt?: string
  updatedAt?: string
}
