import { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { BsLink45Deg } from "react-icons/bs";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Avatar from "./Avatar";
import Button from "./CustomButtons";
import firebase, { firestore } from "../service/firebase.utils";
import { userSelector } from "../store/auth";

export const StyledModal = styled(Modal)`
  font-size: 1.7rem;

  span {
    margin-left: 10px;
  }

  .form-control[type="text"],
  .form-control[type="url"] {
    border: 0;
    border-bottom: 1px solid gray;
    padding: 5px;
    height: 40px;
    font-weight: 200;
    font-size: 1.4rem;
    margin: 14px 0;
    transition: all 0.3s ease;
  }

  .form-control:active,
  .form-control:focus {
    box-shadow: none;
    outline: none;
  }

  button.close > span {
    font-size: 25px;
    margin-right: 10px;
  }

  span.input-group-text {
    background-color: white;
    border: 0;
    height: 40px;
    margin: 14px 0 0 0;
    padding: 5px;
  }
`;

const QuestionModal = ({ title, show, onHide }) => {
  const [question, setQuestion] = useState("");
  const [link, setLink] = useState("");
  const user = useSelector(userSelector);

  const handleQuestion = (e) => {
    e.preventDefault();
    onHide();
    firestore.collection("questions").add({
      user,
      question,
      imageURL: link,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //Add Timestamp after question posted to firebase
    });

    setQuestion("");
    setLink("");
  };
  return (
    <StyledModal centered size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-5 px-4 py-5">
        <Avatar src={user.photo} size="4rem" />
        <span>{user.email}</span>
        <Form>
          <Form.Control
            autoComplete="off"
            onChange={(e) => setQuestion(e.currentTarget.value)}
            placeholder="Add Question"
            type="text"
            value={question}
          />
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <BsLink45Deg size="25px" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              autoComplete="off"
              className="border-0"
              onChange={(e) => setLink(e.currentTarget.value)}
              placeholder="Optionally add Link that gives context"
              type="url"
              value={link}
            />
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button answerButton onClick={handleQuestion}>
          Add Question
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default QuestionModal;
