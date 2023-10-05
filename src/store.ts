import { defineStore } from 'pinia'
import always from 'lodash/fp/always'
import range from 'lodash/range'
import { BOARD_HEIGHT, BOARD_WIDTH } from '~/constants'
import {
  Space,
  Token,
  firstEmptySlotForColumn,
  isColumnFull,
  spaceFromToken,
  spaceToColumnIndex,
  tokenForSpace,
} from '~/models'

const EMPTY_BOARD = range(BOARD_HEIGHT * BOARD_WIDTH).map(always(Space.empty))

const getNextEmpties = (board: Space[]) =>
  range(BOARD_WIDTH).map(col => firstEmptySlotForColumn(board, col))

export const useGameStore = defineStore('game', {
  state: () => ({
    nextEmptySpaces: getNextEmpties(EMPTY_BOARD),
    spaces: EMPTY_BOARD,
    turn: Token.playerOne,
  }),
  actions: {
    drop(spaceIndex: number) {
      const columnIndex = spaceToColumnIndex(spaceIndex)
      const freeSlotIndex = this.nextEmptySpaces[columnIndex] ?? -1
      const token = this.turn
      if (freeSlotIndex > -1) {
        this.spaces[freeSlotIndex] = spaceFromToken(token)
        this.nextEmptySpaces = getNextEmpties(this.spaces)
        this.turn = this.turn === Token.playerOne ? Token.playerTwo : Token.playerOne
      }
    },
    reser() {
      this.spaces = EMPTY_BOARD
      this.nextEmptySpaces = getNextEmpties(EMPTY_BOARD)
    },
  },
  getters: {
    getIsColumnFull: state => (spaceIndex: number) =>
      isColumnFull(state.spaces, spaceToColumnIndex(spaceIndex)),
    getTokenForSpace: state => (index: number) => tokenForSpace(state.spaces[index]),
  },
})
