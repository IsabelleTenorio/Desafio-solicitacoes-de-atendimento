import { z } from "zod";
import { PERFIS } from "./types";

export const registrarUsuarioSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Informe ao menos 3 caracteres.")
      .max(255, "Máximo de 255 caracteres."),
    email: z.email("Informe um e-mail válido.").max(255, "Máximo de 255 caracteres."),
    password: z.string().min(8, "A senha precisa ter ao menos 8 caracteres."),
    password_confirmation: z.string(),
    perfil: z.enum(PERFIS, { message: "Selecione um perfil." }),
  })
  .refine((dados) => dados.password === dados.password_confirmation, {
    message: "As senhas não coincidem.",
    path: ["password_confirmation"],
  });

export type RegistrarUsuarioFormValues = z.infer<typeof registrarUsuarioSchema>;