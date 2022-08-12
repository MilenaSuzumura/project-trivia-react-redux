import React from 'react';
import renderWithRouter from '../tests/helpers/renderWithRouterAndRedux';
import renderWithRouterAndRedux from '../tests/helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Feedback from "../Pages/Feedback";

describe("Testa pagina de feedback", () => {
    // test('Testa se icon do gravatar esta na tela', async () => {
    //     renderWithRouter(<Feedback />);
    //     const gravatar = await screen.findByTestId("header-profile-picture");

    //     expect(gravatar).toBeInTheDocument();
    // })

    test('Testa se existe texto na pagina', async () => {
        renderWithRouter(<Feedback />);
        const text = await screen.findByTestId("feedback-text");

        expect(text).toBeInTheDocument();
    })

    test('Testa se botao leva pro inicio', async () => {
        renderWithRouter(<Feedback />);
        const btn = await screen.findByTestId("btn-play-again");

        userEvent.click(btn);
        const nome = await screen.findByTestId("input-player-name");

        expect(nome).toBeInTheDocument();

    })
    test('Testa se há informações específicas no header', async () => {
        renderWithRouter(<Feedback />);
        const nome = await screen.findByTestId("header-player-name");
        const score = await screen.findByTestId("header-player-score");
        const picture = await screen.findByTestId("header-profile-picture")

        expect(nome).toBeInTheDocument();
        expect(score).toBeInTheDocument();
        expect(picture).toBeInTheDocument();
    })
    test('Testa se há resultados disponíveis para pessoa usuária', async () => {
        renderWithRouter(<Feedback />);
        const finalScore = await screen.findByTestId("feedback-total-score");
        const correctAnswersCounter = await screen.findByTestId("feedback-total-question");

        expect(finalScore).toBeInTheDocument();
        expect(correctAnswersCounter).toBeInTheDocument();
    })
})