import React from 'react';
import { getByTestId, screen } from '@testing-library/react';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from "../App";
import trivia from '../redux/reducer/trivia';
import player from '../redux/reducer/trivia';

describe('Requisito 17 - Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks', () => {
  it('Testa se o botão Ranking', async () => {
    const initialState = {
      login: {
        username: 'testuser',
        email: 'test@test.com',
      },
      player: {
        score: 10,
        assertions: 1,
      }
    }
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/feedback')
    const buttonRank = getByTestId('btn-ranking')
    userEvent.click(buttonRank)
    history.push('/ranking')
  });

  it('Testa se o botão playagain funciona corretamente', async () => {
    const initialState = {
      login: {
        username: 'testuser',
        email: 'test@test.com',
      },
      player: {
        score: 10,
        assertions: 1,
      }
    }
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/feedback')
    const buttonAgain = getByTestId('btn-play-again')
    userEvent.click(buttonAgain)
    history.push('/')
  });

  it('Testa resposta de perguntas de erros e acertos menor que três', async () => {
    const initialState = {
      login: {
        username: 'testuser',
        email: 'test@test.com',
      },
      player: {
        score: 10,
        assertions: 1,
      }
    }
    const { history } = renderWithRouterAndRedux(<App />, initialState)
    history.push('/feedback')
    const feedbackText = getByTestId('feedback-text')
    expect(feedbackText).toHaveTextContent('Could be better...')
  })

 
  it('Testa resposta de perguntas de erros e acertos igual ou maior que três', async () => {
    const initialState = {
      login: {
        username: 'testuser',
        email: 'test@test.com',
      },
      player: {
        score: 10,
        assertions: 3,
      }
    }
    const { history } = renderWithRouterAndRedux(<App />, initialState)
    history.push('/feedback')
    const feedbackText = getByTestId('feedback-text')
    expect(feedbackText).toHaveTextContent('Well Done!')
  })
}
)
