export default function Perks({selected, onChange}){
    function handleCbClick(ev){
        const {checked, name} = ev.target;
        if(checked){
            onChange([...selected, name]);
        } else{
            onChange([...selected.filter(selectedName => selectedName !== name), name]);
        }
        
    }

    return (
        <div>
            <div className="grid gap-4 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" checked={selected.includes("cot")} name="cot" onChange={handleCbClick}/>
                    <span>Extra bed (cot)</span>
                </label>
                <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" checked={selected.includes("wifi")} name="wifi" onChange={handleCbClick}/>
                    <span>Wifi</span>
                </label>
                <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" checked={selected.includes("tv")} name="tv" onChange={handleCbClick}/>
                    <span>TV</span>
                </label>
                <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" checked={selected.includes("entrance")} name="entrance" onChange={handleCbClick}/>
                    <span>Private entrance</span>
                </label>
            </div>
        </div>
    )
}