import { Button, Offcanvas, Form } from "react-bootstrap";
import { useState } from "react";
import { IconButton } from "@mui/material";

interface NavbarProps {
  temperature: number;
  setTemperature: (value: number) => void;
  resetChat: () => void;
  setCharacter: (type: string) => void;
}

const Navbar = ({ temperature, setTemperature, resetChat, setCharacter }: NavbarProps) => {
  const [showCanvas, setShowCanvas] = useState<boolean>(false);

  return (
    <nav className="navbar navbar-expand-lg bg-primary-subtle">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Shiva.AI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/chat">
                Chat
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Choose a chat mode
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#" onClick={() => setCharacter("Default")}>
                    Default AI
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => setCharacter("Story teller")}>
                    Story teller
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => setCharacter("Movie suggester")}>
                    Movie suggester
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => setCharacter("Concise")}>
                  Concise
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => setCharacter("Formal")}>
                  Formal
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => setCharacter("Friendly")}>
                  Friendly
                  </a>
                </li>
                
              </ul>
            </li>
          </ul>
            <IconButton
              aria-label="delete"
              color="primary"
              size="large"
              onClick={resetChat}
              className="p-3 fs-6"
            >Reset Chat</IconButton>
          <Button
            variant="outline-primary"
            onClick={() => setShowCanvas(!showCanvas)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-sliders"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"
              />
            </svg>
          </Button>
          <Offcanvas
            show={showCanvas}
            onHide={() => setShowCanvas(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Settings</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form.Group>
                <Form.Label>Temperature: {temperature}</Form.Label>
                <Form.Range
                  value={temperature}
                  onChange={(e) =>
                    setTemperature(Number(e.target.value))
                  }
                  defaultValue={temperature}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </Form.Group>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
