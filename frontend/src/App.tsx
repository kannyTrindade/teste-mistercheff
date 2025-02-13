import React, { useState } from "react";
import './app.scss';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from 'use-mask-input';
import axios from "axios";
import logo from '../logo.webp';

const formSchema = z.object({
  nome: z.string().nonempty('O nome é obrigatório'),
  cnpj: z.string().nonempty('O CNPJ é obrigatório').regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {message: "O CNPJ deve conter 14 dígitos"}),
  email: z.string().nonempty('O E-mail é obrigatório').email('Formato de E-mail inválido').toLowerCase(),
  telefone: z.string().nonempty('O Telefone é obrigatório'),
  cep: z.string().nonempty('O CEP é obrigatório').regex(/\d{5}-\d{3}/, {message: "O Cep deve conter 8 dígitos"}),
  rua: z.string().nonempty('O Rua é obrigatório'),
  numero: z.string(),
  complemento: z.string(),
  bairro: z.string().nonempty('O Bairro é obrigatório'),
  cidade: z.string().nonempty('O Cidade é obrigatório'),
  estado: z.string().nonempty('O Estado é obrigatório'),
  logo: z.custom((file) => file instanceof File, "A imagem é obrigatória.").refine((file) => file.size < 2 * 1024 * 1024, "A imagem deve ter menos de 2MB."),
});

const App = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [submittedDataForm, setSubmittedDataForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(true);  

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });
  const registerWithMask = useHookFormMask(register);

  const handleFileChange = (event) => {
    setValue("logo", event.target.files[0]); // Salva o arquivo diretamente no campo
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSubmittedDataForm(data);
    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("cnpj", data.cnpj);
    formData.append("email", data.email);
    formData.append("telefone", data.telefone);
    formData.append("cep", data.cep);
    formData.append("rua", data.rua);
    formData.append("numero", data.numero);
    formData.append("complemento", data.complemento);
    formData.append("bairro", data.bairro);
    formData.append("cidade", data.cidade);
    formData.append("estado", data.estado);
    formData.append("logo", data.logo);

    try {
      const response = await axios.post("http://localhost:8000/api", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmittedData(response.data);
      
      setFormVisible(false); // Esconde o formulário
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  return (
    <>
      <main>
        <div className="contact-form">
          <div className="logo">
            <img src={logo} alt="Logo Mistercheff" />
          </div>
          {formVisible ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={"formField " + (errors.nome ? 'error' : '')}>
              
              <input 
                type="text"
                {...register('nome')}
              />
              <label htmlFor="">Nome*</label>
              <span>{errors.nome && errors.nome.message}</span>
            </div>
            
            <div className="formField">
              <label htmlFor="">CNPJ*</label>
              <input 
                type="text" 
                {...registerWithMask("cnpj", "cnpj")}
              />
              <span>{errors.cnpj && errors.cnpj.message}</span>
            </div>

            <div className="formField">
              <label htmlFor="">E-mail*</label>
              <input 
                type="text" 
                {...register('email')}
              />
              <span>{errors.email && errors.email.message}</span>
            </div>

            <div className="formField">
              <label htmlFor="">Telefone*</label>
              <input 
                type="text" 
                {...registerWithMask("telefone", "(99)99999-9999")}
              />
              <span>{errors.telefone && errors.telefone.message}</span>
            </div>

            <div className="formField">
              <label htmlFor="">CEP*</label>
              <input 
                type="text" 
                {...registerWithMask("cep", "99999-999")}
              />
              <span>{errors.cep && errors.cep.message}</span>
            </div>

            <div className="street">
              <div className="formField street">
                <label htmlFor="">Rua*</label>
                <input 
                  type="text" 
                  {...register('rua')}
                />
                <span>{errors.rua && errors.rua.message}</span>
              </div>

              <div className="formField number">
                <label htmlFor="">Nº*</label>
                <input 
                  type="text" 
                  {...register('numero')}
                />
              </div>
            </div>
            
            <div className="formField">
              <label htmlFor="">Complemento</label>
              <input 
                type="text" 
                {...register('complemento')}
              />
            </div>
            <div className="city">
              <div className="formField">
                <label htmlFor="">Bairro*</label>
                <input 
                  type="text" 
                  {...register('bairro')}
                />
                <span>{errors.bairro && errors.bairro.message}</span>
              </div>

              <div className="formField">
                <label htmlFor="">Cidade*</label>
                <input 
                  type="text"
                  {...register('cidade')}
                />
                <span>{errors.cidade && errors.cidade.message}</span>
              </div>
            </div>

            <div className="formField">
              <label htmlFor="">Estado*</label>
              <input 
                type="text"
                {...register('estado')}
              />
             <span>{errors.estado && errors.estado.message}</span>
            </div>
            <div className="formField img">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <span>{errors.logo && errors.logo.message}</span>
            </div>

            <button type="submit" disabled={loading}>{loading ? "Enviando..." : "Enviar"}</button>
          </form>
          ) : (
            submittedData && (
              <div className="successScreen">
                <div className="successAnimation">
                  <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmarkCircle" cx="26" cy="26" r="25" fill="none" /><path className="checkmarkCheck" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </div>
                <h2>Cadastro Efetuado com sucesso!</h2>
                <h3>Seguem dados cadastrados:</h3>
                <ul>
                  <li><strong>Nome:</strong> {submittedDataForm.nome}</li>
                  <li><strong>CNPJ:</strong> {submittedDataForm.cnpj}</li>
                  <li><strong>E-mail:</strong> {submittedDataForm.email}</li>
                  <li><strong>Telefone:</strong> {submittedDataForm.telefone}</li>
                  <li><strong>Cep:</strong> {submittedDataForm.cep}</li>
                  <li><strong>Rua:</strong> {submittedDataForm.rua}</li>
                  <li><strong>Nº:</strong> {submittedDataForm.numero}</li>
                  <li><strong>Complemento:</strong> {submittedDataForm.complemento}</li>
                  <li><strong>Bairro:</strong> {submittedDataForm.bairro}</li>
                  <li><strong>Cidade:</strong> {submittedDataForm.cidade}</li>
                  <li><strong>Estado:</strong> {submittedDataForm.estado}</li>
                  <li className="logoEnviada"><strong>Logo:</strong><br /><img src={'http://localhost:8000/' + submittedData['image_url']} /></li>
                </ul> 
              </div>
            )
          )}
        </div>
      </main>
    </>
  )
}

export default App
