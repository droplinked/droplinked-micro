export default function ProductImageSlider({ image = "/static-image.jpg" }: { image?: string }) {
    return (
        <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
                src={image}
                alt="Product"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04] rounded-lg"
            />
        </div>
    )
}