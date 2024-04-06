import { ChangeEvent, useState, useRef } from 'react'

import { Header2 } from "../../components/Header/Header"

import { HiOutlineViewGrid } from "react-icons/hi";
import { RiListIndefinite } from "react-icons/ri";
import { FaDownload } from "react-icons/fa6";

import "./landing.scss"
import "../../sass/theme.scss"

interface FileData {
    date: any;
    name: string;
    url: string;
}

const Landing = () => {

    const [gridView, setGridView] = useState(false);
    const [listView, setListView] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<FileData[]>([])

    const handleClickView = () => {
        setGridView(prev => !prev);
        setListView(prev => !prev);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            if (
                selectedFile.type.startsWith('image/png') ||
                selectedFile.type.startsWith('image/jpeg') ||
                selectedFile.type.startsWith('image/webp') ||
                selectedFile.name.toLowerCase().endsWith('.svg')
            ) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const previewUrl = reader.result as string;
                    const obj = {
                        name: selectedFile.name,
                        url: previewUrl,
                        date: new Date()
                    };
                    setData(prevData => [...prevData, obj]);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                alert('Unsupported file type. Please select a PNG, JPEG, WebP, or SVG file.');
                event.target.value = '';
            }
        }
        alert("Uploaded Successfully!");
        console.log(data)
    }

    const handleFileClick = () => {
        fileInputRef.current?.click();
    }
    const handleDownload = (imageUrl: string | undefined, filename: string | undefined) => {
        if (!imageUrl) {
            console.error("Image URL is undefined");
            return;
        }

        // Create a temporary anchor element
        const downloadLink = document.createElement('a');
        downloadLink.href = imageUrl;
        downloadLink.download = "Archivum_" + filename; // Use the last part of the URL as the file name
        downloadLink.click(); // Simulate a click to trigger the download
    }
    const handlesort = (event: { target: { value: any; }; }) => {
        const sort: any = event.target.value
        if (sort === "date") {
            console.log("date")
            const sortedData = [...data].sort((a, b) => b.date.getTime() - a.date.getTime());
            setData(sortedData);
            console.log(data);
        }
        else {
            const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
            setData(sortedData);
        }
    }


    return (
        <>
            <Header2 />
            <div className="main-header">
                <div className="heading">My Files</div>
                <div className="button">
                    <button onClick={handleFileClick}> Add Files</button>
                    <input type="file" onChange={handleFileChange} ref={fileInputRef} accept=".png, .jpeg, .jpg, .webp, .svg" />
                </div>
            </div>
            <div className="main-body">
                <header>
                    <div className="view-continer">
                        <HiOutlineViewGrid className={gridView ? "view1" : "view1-invert"} onClick={handleClickView} />
                        <RiListIndefinite className={listView ? "view2" : "view2-invert"} onClick={handleClickView} />
                    </div>
                    <div className="filter-container">
                        <select className='form-select' onChange={handlesort}>
                            <option value={"date"}>Date</option>
                            <option value={"name"}>Alphabet</option>
                        </select>
                    </div>
                </header>
                <div className="main-content">
                    {!gridView ? <div className="gridView">
                        <div className="Grid">
                            {data.map(co =>
                                <div className="card">
                                    <div className="img-container">
                                        <img src={co.url} alt="" width={"100%"} />
                                    </div>
                                    <div className="text-container">
                                        <div className="heading">
                                            {co.name}
                                        </div>
                                        <div className="date">
                                            {co.date.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div> : (
                        <div className="listView">
                            <table>
                                <thead>
                                    <tr>
                                        <th>SrNo</th>
                                        <th>FileName</th>
                                        <th>Datetime</th>
                                        <th>Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((co, index) => <tr key={index + 1}>
                                        <td data-label="SrNo">{index + 1}</td>
                                        <td data-label="File Name">{co.name}</td>
                                        <td data-label="Datetime">{co.date.toLocaleString()}</td>
                                        <td data-label="Download" style={{ cursor: "pointer" }} onClick={() => handleDownload(co.url, co.name)}><FaDownload /></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Landing