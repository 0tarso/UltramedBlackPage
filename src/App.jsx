import { useEffect, useState } from "react"
import useFirebase from "./hooks/useFirebase"

import Lottie from "react-lottie";
import { toast, ToastContainer } from "react-toastify"
import ReactInputMask from "react-input-mask";


import 'react-toastify/dist/ReactToastify.css';
import './app.css'


import blackLogo from './assets/blackLogo.png'
import ultraLogo from './assets/ultraLogo.png'
import phoneGif from './assets/celularJSON.json'

function App() {
  useEffect(() => {
    const isRegistered = localStorage.getItem('@isRegistered')
    const userRegistered = localStorage.getItem('@userRegistered')

    if (isRegistered) {
      setIsUserRegistered(true)
      setIsUserData(JSON.parse(userRegistered))
    }

  }, [])

  const { saveNumber, successfullyRegistered } = useFirebase()

  const [isChecked, setIsChecked] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isUserRegistered, setIsUserRegistered] = useState(false)
  const [isUserData, setIsUserData] = useState(null)

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)
  }

  const phoneMask = (e) => {
    const cleanedValue = e.target.value.replace(/[^0-9]/g, "")
    setPhone(cleanedValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(phone.length)
    console.log(phone)
    if (name === "" || phone === "") {
      toast.info("Todos os campos devem ser preenchidos!")
      return
    }

    if (phone.length < 11) {
      toast.info("O número de telefone deve conter 11 dígitos")
      return
    }

    if (!isChecked) {
      toast.info("Você deve aceitar receber ofertas!")
      return
    }

    console.log(name)
    console.log(phone)

    try {
      await saveNumber(name, phone)

      toast.success("Pronto! Tudo certo.")
    }
    catch {
      toast.error("Ops! Erro ao salvar. Tente mais tarde.")
    }
  }

  if (isUserRegistered) {
    return (
      <div className="app-container successfully">
        <img
          src={blackLogo} alt="Logo Black Week Ultramed Popular"
        />
        <div className="modal-container successfully">
          <Lottie height={200} width={200} options={{ loop: true, autoplay: true, animationData: phoneGif }} />
          <span>Olá, {isUserData.name}</span>
          <p>Você ja cadastrou o seu número</p>
          <h3>Aguarde...</h3>
          <p>Pois a Black está chegando!</p>

          <div className="logoUltra-box">
            <img src={ultraLogo} />
          </div>
        </div>

        <button className="back-btn">
          <a href="https://www.instagram.com/stories/ultramedpopular/">Voltar para o Instagram</a>
        </button>
      </div>
    )
  }

  if (successfullyRegistered) {
    return (
      <div className="app-container successfully">
        <h1>Parabéns!</h1>
        <div className="modal-container successfully">
          <Lottie height={200} width={200} options={{ loop: true, autoplay: true, animationData: phoneGif }} />
          <p>Agora você receberá</p>
          <h3>OFERTAS EXCLUSIVAS</h3>
          <p>em seu celular!</p>

          <div className="logoUltra-box">
            <img src={ultraLogo} />
          </div>
        </div>

        <button className="back-btn">
          <a href="https://www.instagram.com/stories/ultramedpopular/">Voltar para o Instagram</a>
        </button>
      </div>
    )
  }


  return (
    <>
      <div className="app-container">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />


        <img
          src={blackLogo} alt="Logo Black Week Ultramed Popular"
        />
        <div className="modal-container">

          <h1>Fique por dentro de todas as ofertas!</h1>

          <form className="form-container" onSubmit={handleSubmit}>

            <label>Seu nome</label>
            <input placeholder="Seu nome aqui" type="text" onChange={(e) => setName(e.target.value)} />

            <label>Seu número de telefone</label>
            <ReactInputMask
              mask="(99) 99999-9999"
              placeholder="(12) 12345-6789"
              maskChar={null}
              onChange={(e) => phoneMask(e)}
            >
              {(inputProps) => <input {...inputProps} type="tel" />}
            </ReactInputMask>


            <div className="checkbox-area">
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              <a href="">Aceito receber ofertas no meu WhatsApp</a>
            </div>
            <div className="btn-area">
              <button className="confirm-btn" type="submit">Receber Ofertas!</button>
            </div>

            <div className="logoUltra-box">
              <img src={ultraLogo} />
            </div>

            <p>
              {successfullyRegistered && "Cadastrado"}
            </p>
          </form>
        </div>

      </div>
    </>
  )
}

export default App
