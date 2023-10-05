import range from 'lodash/range'
import { BOARD_HEIGHT, BOARD_WIDTH, OUT_OF_RANGE_INDEX } from '~/constants'

export enum Space {
  empty,
  playerOne,
  playerTwo,
}

export enum Token {
  playerOne = 'player-one',
  playerTwo = 'player-two',
}

export const playerNameForToken = (token: Token) =>
  token === Token.playerOne ? 'Player One' : 'Player Two'

export const tokenForSpace = (space: Space | undefined): Token | null => {
  switch (space) {
    case Space.playerOne:
      return Token.playerOne
    case Space.playerTwo:
      return Token.playerTwo
  }

  return null
}

export const spaceFromToken = (token: Token): Space =>
  token === Token.playerOne ? Space.playerOne : Space.playerTwo

export type Coords = [x: number, y: number]

const rangeForColumn = (columnIndex: number): Space[] => {
  const end = columnIndex * BOARD_HEIGHT - 1
  const start = end + BOARD_HEIGHT

  return range(start, end)
}

export const firstEmptySlotForColumn = (board: Space[], columnIndex: number) =>
  rangeForColumn(columnIndex).find(index => board[index] === Space.empty) ?? -1

export const isColumnFull = (board: Space[], columnIndex: number) =>
  rangeForColumn(columnIndex).every(index => board[index] !== Space.empty)

export const spaceToColumnIndex = (spaceIndex: number) =>
  Math.floor(spaceIndex / BOARD_HEIGHT)

export const getWinners = (board: Space[]): [Token, number[]] | [null, []] => {
  for (const [index, space] of board.entries()) {
    if (space === Space.empty) continue

    const winners = getConnections(index, space, board).find(Array.isArray)
    if (winners) {
      return [tokenForSpace(board[winners[0]]!)!, winners]
    }
  }

  return [null, []]
}

const DIRECTIONS = ['right', 'diagRight', 'down', 'diagLeft'] as const
type Direction = (typeof DIRECTIONS)[number]

const getConnections = (
  index: number,
  space: Space.playerOne | Space.playerTwo,
  board: Space[],
) =>
  (['right', 'diagRight', 'down', 'diagLeft'] as const).map(dir =>
    getConnectionsForDirection(dir, [index], space, board),
  )

const getConnectionsForDirection = (
  direction: Direction,
  chain: number[],
  space: Space.playerOne | Space.playerTwo,
  board: Space[],
): number[] | null => {
  const [lastIndex] = chain.slice(-1)
  if (typeof lastIndex !== 'number') throw new Error('TODO: make a real error type')

  const next = getDirection(direction, lastIndex)
  if (typeof next === 'number' && board[next] === space) {
    const connections = [...chain, next]
    if (connections.length === 4) {
      return connections
    }

    return getConnectionsForDirection(direction, connections, space, board)
  }

  return null
}

const getDirection = (direction: Direction, index: number) => {
  switch (direction) {
    case 'diagRight':
      return spaceDiagRight(index)
    case 'diagLeft':
      return spaceDiagLeft(index)
    case 'down':
      return spaceBelow(index)
    case 'right':
      return spaceToRight(index)
  }
}

const spaceToRight = (index: number): number | null => {
  const maybeIndex = index + BOARD_HEIGHT
  return maybeIndex < OUT_OF_RANGE_INDEX ? maybeIndex : null
}

const bottomRow = range(BOARD_WIDTH).map(i => (BOARD_HEIGHT - 1) * (i + 1))
const spaceBelow = (index: number): number | null =>
  bottomRow.includes(index) ? null : index + 1

const spaceDiagRight = (index: number): number | null => {
  const right = spaceToRight(index)
  if (typeof right === 'number') {
    return spaceBelow(right)
  }

  return null
}

const spaceToLeft = (index: number): number | null => {
  const left = index - BOARD_HEIGHT
  return left > -1 ? left : null
}

const spaceDiagLeft = (index: number): number | null => {
  const left = spaceToLeft(index)
  if (typeof left === 'number') {
    return spaceBelow(left)
  }

  return null
}
