import { z } from "zod";





//$ Auth $ users 
const authSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string(),
    password_confirmation:z.string(),
    token:z.string()
})

//* ->  types
export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, "email" | "password">
export type UserRegistrationForm = Pick<Auth, "email" | "password" | "name" | "password_confirmation">
export type RequestConfirmationCodeForm  = Pick<Auth, "email">
export type ConfirmToken = Pick<Auth, "token">
export type ForgotPasswordForm = Pick<Auth, "email">
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">

//$ Users


export const userSchema = authSchema.pick({
    name:true,
    email:true
}).extend({
    _id:z.string()
})

//# -> notes
const noteSchema = z.object({
    _id:z.string(),
    content:z.string(),
    createdBy:userSchema,
    task:z.string(),
    createdAt:z.string()
})
export const notesSchema = z.array(noteSchema)
//. ->  Types
export type Note = z.infer<typeof noteSchema >
export type NoteFormData = Pick<Note, "content">


export type User = z.infer<typeof userSchema> 
//$ ->  Task    

//* ->  Schema
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export const taskSchema = z.object({
    _id:z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy:z.array(z.object( { user:userSchema, status:taskStatusSchema, _id:z.string() } )),
    createdAt:z.string(),
    updatedAt:z.string()
})
export const taskForProjectViewSchema = z.object({
    _id:z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy:z.array(z.object( { user:z.string(), status:taskStatusSchema, _id:z.string() } )),
    createdAt:z.string(),
    updatedAt:z.string()
})


//* ->  Types

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, "description" | "name">
export type TaskProject = z.infer<typeof taskForProjectViewSchema>
export type TaskStaus = Pick<Task, "status" >

//$ Team     


//# ->  Schemas
export const teamMemberSchema = userSchema.pick({
    name:true,
    email:true,
    _id:true
})
export const TeamSchema = z.array(teamMemberSchema)
//# ->  Types
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, "email">
export type Team = z.infer<typeof TeamSchema>



//$ Generic 

export const genericResponseSchema = z.string()

export type genericResponse = z.infer<typeof genericResponseSchema>

//$ Projects 

//* ->  Schemas
export const projectSchema = z.object({
    _id:z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description:z.string(),
    tasks:z.array(taskForProjectViewSchema),
    manager:z.string(userSchema.pick({_id:true}))
})

export const dashBoardProjectsSchema = z.array(
    projectSchema.pick({
        _id:true,
        projectName:true,
        clientName:true,
        description:true,
        tasks:true,
        manager:true
    })
)

//* ->  Types
export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, "clientName" | "description" | "projectName">//# Type para el formulario


//#->   Profile

//. ->  Schemas
export const ProfileFormSchema = userSchema.pick({
    name:true,
    email:true
})
export const CountProjectSchema = z.object({
    manager:z.number(),
    member:z.number()
})
export const UpdatePasswordSchema = z.object({
    passwordCurrency:z.string(),
    password:z.string(),
    password_confirmation:z.string()
})
//. ->  Types
export type ProfileForm = z.infer<typeof ProfileFormSchema>
export type CountProject = z.infer<typeof CountProjectSchema>
export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>
export type CheckPassword = Pick<UpdatePassword, "password">