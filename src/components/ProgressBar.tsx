interface ProgressBarProps {
  current: number;
  target: number;
  className?: string;
}

export default function ProgressBar({ current, target, className = '' }: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-amber-500 h-2.5 rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>{percentage.toFixed(1)}%</span>
        <span>R$ {current.toLocaleString('pt-BR')} / R$ {target.toLocaleString('pt-BR')}</span>
      </div>
    </div>
  );
}
