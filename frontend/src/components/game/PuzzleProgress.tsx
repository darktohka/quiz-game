import { useEffect, useState } from 'preact/hooks';
import { Card, CardContent } from '@/components/game/ui/card';
import { Badge } from '@/components/game/ui/badge';
import { hu } from '@/locales/hu';

interface PuzzleProgressProps {
  totalPieces: number;
  completedPieces: number;
  puzzleImage: string;
  isComplete: boolean;
}

export const QUIZ_PIECE_SIZE = 8; // Size of each puzzle piece by side
export const QUIZ_PIECES = QUIZ_PIECE_SIZE * QUIZ_PIECE_SIZE; // Total number of puzzle pieces

export const getVisiblePieces = (
  completedPieces: number,
  totalPieces: number,
) => {
  const percentage = totalPieces > 0 ? completedPieces / totalPieces : 0;
  return Math.floor(percentage * QUIZ_PIECES);
};

const PuzzleProgress = ({
  totalPieces,
  completedPieces,
  puzzleImage,
  isComplete,
}: PuzzleProgressProps) => {
  const [animatingPiece, setAnimatingPiece] = useState<number | null>(null);
  const [puzzleOrder, setPuzzleOrder] = useState<number[]>([]);

  useEffect(() => {
    const order = Array.from({ length: QUIZ_PIECES }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setPuzzleOrder(order);
  }, []);

  useEffect(() => {
    if (completedPieces > 0) {
      setAnimatingPiece(completedPieces - 1);
      const timer = setTimeout(() => setAnimatingPiece(null), 800);
      return () => clearTimeout(timer);
    }
  }, [completedPieces]);

  const visiblePieces = getVisiblePieces(completedPieces, totalPieces);

  const generatePieceStyle = (gridIndex: number) => {
    const pieceIndex = puzzleOrder.indexOf(gridIndex);
    const isVisible = pieceIndex < visiblePieces;
    const isAnimating =
      animatingPiece !== null && pieceIndex === visiblePieces - 1;

    const row = Math.floor(gridIndex / QUIZ_PIECE_SIZE);
    const col = gridIndex % QUIZ_PIECE_SIZE;
    const size = QUIZ_PIECE_SIZE * 100;

    return {
      backgroundImage: isVisible ? `url(${puzzleImage})` : 'none',
      backgroundPosition: `${-col * 100}% ${-row * 100}%`,
      backgroundSize: `${size}% ${size}%`,
      backgroundColor: isVisible ? 'transparent' : '#e5e7eb',
      transform: isAnimating
        ? 'scale(1.1) rotate(5deg)'
        : 'scale(1) rotate(0deg)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      border: isVisible ? '2px solid #22c55e' : '2px solid #d1d5db',
    };
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{hu.puzzleProgress}</h3>
          <Badge variant={isComplete ? 'default' : 'secondary'}>
            {visiblePieces}/{QUIZ_PIECES} {hu.puzzlePiecesUnlocked}
          </Badge>
        </div>

        <div
          className="grid gap-[0.2rem] aspect-square bg-gray-100 p-4 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${QUIZ_PIECE_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: QUIZ_PIECES }, (_, index) => (
            <div
              key={index}
              className="aspect-square rounded-sm flex items-center justify-center overflow-hidden"
              style={generatePieceStyle(index)}
            />
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          {Math.round((visiblePieces / QUIZ_PIECES) * 100)}
          {'% '}
          {hu.completePercentage}
        </div>

        {isComplete && (
          <div className="mt-4 text-center">
            <div className="text-2xl animate-pulse">🎉</div>
            <p className="text-green-600 font-semibold">{hu.puzzleComplete}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PuzzleProgress;
