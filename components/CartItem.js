import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      onUpdateQuantity(item._id, item.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item._id, item.quantity - 1);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      {/* Product Image */}
      <Link href={`/products/${item._id}`} className="flex-shrink-0">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-grow">
        <Link href={`/products/${item._id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
            {item.name}
          </h3>
        </Link>
        <p className="text-primary-600 font-semibold mt-1">
          {formatPrice(item.price)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
          className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="text-lg font-semibold w-8 text-center">
          {item.quantity}
        </span>

        <button
          onClick={handleIncrease}
          disabled={item.quantity >= item.stock}
          className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="font-bold text-lg text-gray-900">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item._id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Remove from cart"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}
