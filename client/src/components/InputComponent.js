

export default function InputComponent({ fileHandler }) {
    return (
        <input 
            type="file"
            onChange={(e) => fileHandler(e)}
        />
    )
}