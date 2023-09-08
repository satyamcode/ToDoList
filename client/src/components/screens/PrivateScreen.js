import { React, useState, useEffect, useRef } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import Element from "../Element";
import NavBar from "../NavBar";
import Button from "@mui/material/Button";
import Form from "../Form";

const PrivateScreen = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState({
    title: "",
    description: "",
  });
  const [list, setList] = useState([]);
  const id = useRef("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          contentType: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/personal/private", config);
        setPrivateData(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
      try {
        const { data } = await axios.get("/api/personal/getlist", config);
        setList(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
    fetchPrivateData();
  }, [navigate, add, update]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const deleteElement = async () => {
    const config = {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios.post(`/api/personal/deleteelement/${id.current}`, {}, config);

      const newList = list.filter((element) => {
        return element._id !== id.current;
      });

      setList(newList);
    } catch (error) {
      localStorage.removeItem("authToken");
      setError("You are not authorized please login");
    }
  };

  const addButton = async () => {
    setAdd(!add);
  };

  const updateButton = async (val) => {
    setValue(val);
    setUpdate(!update);
  };

  return error ? (
    <>
      {console.log(error)}
      <span>{error}</span>
    </>
  ) : (
    <>
      <NavBar data={{ privateData, logoutHandler }} />

      {(add || update) && (
        <Form
          data={{ setList, list, add, setAdd, update, setUpdate, value, id }}
        />
      )}

      <Button sx={{ m: 2 }} variant="contained" onClick={addButton}>
        Add Item
      </Button>

      <div className="row my-3 mx-3">
        {list.map((element) => {
          return (
            <Element
              key={element._id}
              data={{ element, updateButton, deleteElement, id }}
            />
          );
        })}
      </div>
    </>
  );
};

export default PrivateScreen;
