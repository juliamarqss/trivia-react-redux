import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from "../App";
import trivia from '../redux/reducer/trivia';

const mockFetch = () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockData),
      }));
  };

describe('Requisito 4 -  Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
    it('Testa se existem inputs da tela de login', async () => {
        renderWithRouterAndRedux(<App />)
        
        const userName = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');
        const startButton = screen.getByTestId('btn-play');
        const configButton = screen.getByTestId('btn-settings');
        
        expect(userName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(startButton).toBeInTheDocument();
        expect(configButton).toBeInTheDocument();
    })

    it('Testa se o botão é habilitado apenas quando os 2 campos são preenchidos', async () => {
        renderWithRouterAndRedux(<App />)

        const userName = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');
        const startButton = screen.getByTestId('btn-play');

        
        userEvent.type(userName, 'testUser');
        expect(userName.value).toBe('testUser');
        expect(startButton).toBeDisabled();
        
        userEvent.type(email, 'testuser@pessoa.com');
        expect(email.value).toBe('testuser@pessoa.com');
        expect(startButton).toBeEnabled();

    })

    it('Testa se o botão PLAY permanece desabilitado se apenas o campo email for preenchido', () => {
        renderWithRouterAndRedux(<App />)

        const userEmail = screen.getByTestId('input-gravatar-email')
        const startButton = screen.getByTestId('btn-play');
        
        userEvent.type(userEmail, 'testuser@pessoa.com');
        expect(userEmail.value).toBe('testuser@pessoa.com');
        expect(startButton).toBeDisabled();

    })

    it('Testa se ao clicar em play a página é redirecionada', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const startButton = screen.getByTestId('btn-play');
        const userName = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');
        expect(startButton).toBeInTheDocument();

        userEvent.type(email, 'testuser@pessoa.com');
        userEvent.type(userName, 'testUser');
        userEvent.click(startButton);

        history.push('/game');
    })

    it('Testa se ao clicar em setting a página é redirecionada', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const configButton = screen.getByTestId('btn-settings');
        expect(configButton).toBeInTheDocument();

        userEvent.click(configButton);

        history.push('/settings');
    })

    // it('Testa state e local storage', async () => {
    //     jest.spyOn(window.localStorage.token, 'setItem');  

    //     mockFetch();
    //     const initialState = {
    //         login:{
    //             userName: '',
    //             email: '',
    //         },
    //         trivia: {
    //             score: 0,
    //         }
    //     };
    //     renderWithRouterAndRedux(<App />, initialState);
    // })
})