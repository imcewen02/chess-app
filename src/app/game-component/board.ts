import { Piece, Pawn, Rook, Knight, Bishop, Queen, King, Color } from './pieces';

export class Board {
	private pieces: Map<string, Piece> = new Map<string, Piece>();
	private static files = ["A", "B", "C", "D", "E", "F", "G", "H"];
	private static ranks = [8, 7, 6, 5, 4, 3, 2, 1];

	constructor() {
		//Fill in the starting spaces
		this.pieces.set('A1', new Rook(Color.WHITE))
		this.pieces.set('B1', new Knight(Color.WHITE))
		this.pieces.set('C1', new Bishop(Color.WHITE))
		this.pieces.set('D1', new Queen(Color.WHITE))
		this.pieces.set('E1', new King(Color.WHITE))
		this.pieces.set('F1', new Bishop(Color.WHITE))
		this.pieces.set('G1', new Knight(Color.WHITE))
		this.pieces.set('H1', new Rook(Color.WHITE))

		this.pieces.set('A2', new Pawn(Color.WHITE))
		this.pieces.set('B2', new Pawn(Color.WHITE))
		this.pieces.set('C2', new Pawn(Color.WHITE))
		this.pieces.set('D2', new Pawn(Color.WHITE))
		this.pieces.set('E2', new Pawn(Color.WHITE))
		this.pieces.set('F2', new Pawn(Color.WHITE))
		this.pieces.set('G2', new Pawn(Color.WHITE))
		this.pieces.set('H2', new Pawn(Color.WHITE))

		this.pieces.set('A8', new Rook(Color.BLACK))
		this.pieces.set('B8', new Knight(Color.BLACK))
		this.pieces.set('C8', new Bishop(Color.BLACK))
		this.pieces.set('D8', new Queen(Color.BLACK))
		this.pieces.set('E8', new King(Color.BLACK))
		this.pieces.set('F8', new Bishop(Color.BLACK))
		this.pieces.set('G8', new Knight(Color.BLACK))
		this.pieces.set('H8', new Rook(Color.BLACK))

		this.pieces.set('A7', new Pawn(Color.BLACK))
		this.pieces.set('B7', new Pawn(Color.BLACK))
		this.pieces.set('C7', new Pawn(Color.BLACK))
		this.pieces.set('D7', new Pawn(Color.BLACK))
		this.pieces.set('E7', new Pawn(Color.BLACK))
		this.pieces.set('F7', new Pawn(Color.BLACK))
		this.pieces.set('G7', new Pawn(Color.BLACK))
		this.pieces.set('H7', new Pawn(Color.BLACK))
	}

	public static getFiles() : string[] {
		return Board.files;
	}

	public static getFileAsNumber(file: string) {
		if (file !in Board.files) {
			throw new Error("Unrecognized File");
		}

		return Board.files.indexOf(file) + 1;
	}

	public static getNumberAsFile(file: number) {
		return Board.files[file - 1];
	}

	public static getRanks() : number[] {
		return Board.ranks;
	}

	public getPieceOnSquare(square: Square) : Piece | undefined {
		return this.pieces.get(square.toStringId());
	}

	public movePiece(origin: Square, destination: Square) {
		this.pieces.set(destination.toStringId(), this.pieces.get(origin.toStringId())!)
		this.pieces.delete(origin.toStringId());
	}

	public static getNextSquareForward(origin: Square, color: Color) : Square | null {
		if (!origin.isValid()) {
			return null;
		}

		const file = origin.getFile();
		const rank = origin.getRank() + (color == Color.WHITE ? 1 : -1);
		const square = new Square(file, rank);
		return square.isValid() ? new Square(file, rank) : null;
	}

	public static getNextSquareBackward(origin: Square, color: Color) : Square | null {
		if (!origin.isValid()) {
			return null;
		}

		const file = origin.getFile();
		const rank = origin.getRank() + (color == Color.WHITE ? -1 : 1);
		const square = new Square(file, rank);
		return square.isValid() ? new Square(file, rank) : null;
	}

	public static getNextSquareLeft(origin: Square, color: Color) : Square | null {
		if (!origin.isValid()) {
			return null;
		}

		const file = Board.getNumberAsFile(Board.getFileAsNumber(origin.getFile()) + (color == Color.WHITE ? -1 : 1));
		const rank = origin.getRank();
		const square = new Square(file, rank);
		return square.isValid() ? new Square(file, rank) : null;
	}

	public static getNextSquareRight(origin: Square, color: Color) : Square | null {
		if (!origin.isValid()) {
			return null;
		}

		const file = Board.getNumberAsFile(Board.getFileAsNumber(origin.getFile()) + (color == Color.WHITE ? 1 : -1));
		const rank = origin.getRank();
		const square = new Square(file, rank);
		return square.isValid() ? new Square(file, rank) : null;
	}

	public static getNextSquareForwardRight(origin: Square, color: Color) : Square | null {
		if (!origin.isValid()) {
			return null;
		}

		const file = Board.getNumberAsFile(Board.getFileAsNumber(origin.getFile()) + (color == Color.WHITE ? 1 : -1));
		const rank = origin.getRank() + (color == Color.WHITE ? 1 : -1);
		const square = new Square(file, rank);
		return square.isValid() ? new Square(file, rank) : null;
	}

	public static getNextSquareForwardLeft(origin: Square, color: Color) : Square | null {
		if (!origin.isValid()) {
			return null;
		}

		const file = Board.getNumberAsFile(Board.getFileAsNumber(origin.getFile()) + (color == Color.WHITE ? -1 : 1));
		const rank = origin.getRank() + (color == Color.WHITE ? 1 : -1);
		const square = new Square(file, rank);
		return square.isValid() ? new Square(file, rank) : null;
	}

	public static getNextSquareBackwardLeft(origin: Square, color: Color) : Square | null {
		if (!origin.isValid()) {
			return null;
		}

		const file = Board.getNumberAsFile(Board.getFileAsNumber(origin.getFile()) + (color == Color.WHITE ? -1 : 1));
		const rank = origin.getRank() + (color == Color.WHITE ? -1 : 1);
		const square = new Square(file, rank);
		return square.isValid() ? new Square(file, rank) : null;
	}

	public static getNextSquareBackwardRight(origin: Square, color: Color) : Square | null {
		if (!origin.isValid()) {
			return null;
		}

		const file = Board.getNumberAsFile(Board.getFileAsNumber(origin.getFile()) + (color == Color.WHITE ? 1 : -1));
		const rank = origin.getRank() + (color == Color.WHITE ? -1 : 1);
		const square = new Square(file, rank);
		return square.isValid() ? new Square(file, rank) : null;
	}

	public isMoveLegal(origin: Square, destination: Square) : boolean {
		const movingPiece = this.pieces.get(origin.toStringId())!;
		const destinationPiece = this.pieces.get(destination.toStringId());

		let movingPlayersKingPostion: Square;
		if (movingPiece instanceof King) {
			movingPlayersKingPostion = destination;
		} else {
			for (let squareId of this.pieces.keys()) {
				const pieceAtSquare = this.pieces.get(squareId);
				if (pieceAtSquare instanceof King && pieceAtSquare.getColor() == movingPiece?.getColor()) {
					movingPlayersKingPostion = new Square(squareId[0], Number(squareId[1]));
					break;
				}
			}
		}

		this.pieces.delete(origin.toStringId());
		this.pieces.set(destination.toStringId(), movingPiece);

		try {
			for (let squareId of this.pieces.keys()) {
				const pieceAtSquare = this.pieces.get(squareId);
				if (pieceAtSquare?.getColor() != movingPiece?.getColor()) {
					const opposingPiecesPossibleMoves = pieceAtSquare?.getPossibleMoves(new Square(squareId[0], Number(squareId[1])), this, false);
					const opposingPieceCanAttackKing = opposingPiecesPossibleMoves?.some(move => move.getFile() == movingPlayersKingPostion.getFile() && move.getRank() == movingPlayersKingPostion.getRank());
					if (opposingPieceCanAttackKing) {
						return true;
					}
				}
			}
		} catch (err) {
			//Catch all errors to always ensure the piece gets moved back
			console.log(err)
		} finally {
			if (destinationPiece != null && destinationPiece != undefined) {
				this.pieces.set(destination.toStringId(), destinationPiece);
			} else {
				this.pieces.delete(destination.toStringId());
			}

			this.pieces.set(origin.toStringId(), movingPiece);
		}

		return false;
	}
}

export class Square {
	private file: string;
	private rank: number;

	constructor(file: string, rank: number) {
		this.file = file;
		this.rank = rank;
	}

	public getFile() : string {
		return this.file;
	}

	public getRank() : number {
		return this.rank;
	}

	public toStringId() : string {
		return this.file + this.rank;
	}

	public isValid() : boolean {
		return Board.getFiles().indexOf(this.file) != -1 && Board.getRanks().indexOf(this.rank) != -1
	}
}