import { useState } from "react";
import styled from "styled-components";
import { useHistory, Link, useParams } from "react-router-dom";
import { addEntry } from "../../services/API";
import Loader from "react-loader-spinner";
import CurrencyInput from "react-currency-input-field";
import { IoChevronBackOutline } from "react-icons/io5";

export default function AddEntry() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { entryType } = useParams();
  const history = useHistory();

  const token = JSON.parse(localStorage.getItem("user"))?.token;
  if (!token) {
    history.push("/");
  }

  const submitEntry = (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      value: entryType === "nova-saida" ? -Number(value) : Number(value),
      description,
    };

    if (body.value === 0) {
      alert("Digite um valor diferente de zero");
      setLoading(false);
    } else {
      addEntry({ body, token })
        .then(() => {
          setValue("");
          setDescription("");
          setLoading(false);
          history.push("/conta");
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <EntryContainer loading={loading}>
      <header>
        <h1>{entryType === "nova-saida" ? "Nova saída" : "Nova entrada"}</h1>
        <Link to="/conta">
          <IoChevronBackOutline className="icon" />
        </Link>
      </header>

      <form onSubmit={submitEntry}>
        <CurrencyInput
          placeholder="Valor"
          prefix="R$ "
          value={value}
          decimalsLimit={2}
          onValueChange={(value) => setValue(value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">
          {loading ? (
            <Loader type="ThreeDots" color="#FFFFFF" height={13} width={51} />
          ) : entryType === "nova-saida" ? (
            "Salvar saída"
          ) : (
            "Salvar entrada"
          )}
        </button>
      </form>
    </EntryContainer>
  );
}

const EntryContainer = styled.div`
  margin-top: 35px;
  padding: 0 25px;

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 26px;
      color: #ffffff;
      font-family: "Raleway", sans-serif;
      margin-bottom: 40px;
      text-align: start;
      font-weight: 700;
    }

    .icon {
      color: #ffffff;
      font-size: 26px;
      cursor: pointer;
    }
  }

  input {
    display: block;
    width: 100%;
    height: 58px;
    margin: 0 auto 15px;
    padding: 0 15px;
    border-radius: 5px;
    background-color: ${({ loading }) => (loading ? "#F2F2F2" : "#FFFFFF")};
    color: ${({ loading }) => (loading ? "#AFAFAF" : "#000000")};
    font-size: 20px;
    font-family: "Raleway", sans-serif;
    pointer-events: ${({ loading }) => (loading ? "none" : "all")};

    ::placeholder {
      color: #000000;
    }
  }

  button {
    display: block;
    width: 100%;
    height: 46px;
    margin: 0 auto;
    background-color: #a32bd6;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
    opacity: ${({ loading }) => (loading ? 0.7 : 1)};
    pointer-events: ${({ loading }) => (loading ? "none" : "all")};

    :hover {
      opacity: 0.8;
    }
  }
`;
