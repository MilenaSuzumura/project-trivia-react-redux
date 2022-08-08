import React from "react";
import renderWithRouter from "../tests/helpers/renderWithRouterAndRedux";
import renderWithRouterAndRedux from "../tests/helpers/renderWithRouterAndRedux";
import Login from "../Pages/Login";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import App from "../App";

describe("Teste do input de login", () => {
  test("Testa se o input de email aparece na tela", async () => {
    renderWithRouter(<Login />);
    const email = await screen.findByTestId("input-gravatar-email");

    expect(email).toBeInTheDocument();
  });

  test("Testa se o input de nome aparece na tela", async () => {
    renderWithRouter(<Login />);
    const nome = await screen.findByTestId("input-player-name");

    expect(nome).toBeInTheDocument();
  });
});

describe("Teste dos textos do Login", () => {
  test("Testa se o texto Login aparece na tela", async () => {
    renderWithRouter(<Login />);
    const text = await screen.findByText(/Login/i);

    expect(text).toBeInTheDocument();
  });
});

describe("Testa o botão", () => {
  test("teste se o botão aparece na tela", async () => {
    renderWithRouter(<Login />);
    const button = await screen.findByTestId("btn-play");

    expect(button).toBeInTheDocument();
  });

  test("Testa se o botão está desabilitado", async () => {
    renderWithRouter(<Login />);
    const button = await screen.findByTestId("btn-play");

    expect(button.disabled).toBe(true);
  });

  test("Testa se o botão habilita ao preencher os campos", async () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByRole("textbox", { name: /nome:/i });
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    // const name = screen.getByTestId("input-player-name");

    screen.logTestingPlaygroundURL();
    userEvent.type(name, "Robson");
    userEvent.type(email, "robson@souorob.com.bson");

    // name.value = 'Robson'
    // email.value = 'stick@gmail.com'

    // const button = await screen.findByTestId("btn-play");

    // expect(button.disabled).toBe(false);
    expect(name).toHaveValue("Robson");
    expect(email).toHaveValue("robson@souorob.com.bson");
    expect(button.disabled).toBe(false);
  });

  test("Testa se o botão é clicável", async () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByRole("textbox", { name: /nome:/i });
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    const login = screen.getByText(/Login/i);
    // const name = screen.getByTestId("input-player-name");

    screen.logTestingPlaygroundURL();
    userEvent.type(name, "Robson");
    userEvent.type(email, "robson@souorob.com.bson");
    userEvent.click(button);

    expect(login).toBeInTheDocument();
  });

  test("Testa se, ao clicar no botão configurações, exibe as configurações", async () => {
    renderWithRouterAndRedux(<App />);

    const config = screen.getByTestId("btn-settings");
    const text = /Configurações/i

    userEvent.click(config);
    expect(screen.getByText(text)).toBeInTheDocument();
  })
});


