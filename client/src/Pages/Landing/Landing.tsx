import { ChangeEvent, useState, useRef, useEffect, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Header2 } from "../../components/Header/Header"
import { setFiles } from '../../reducers/filesReducer'

import { HiOutlineViewGrid } from "react-icons/hi";
import { RiListIndefinite } from "react-icons/ri";
import { FaDownload } from "react-icons/fa6";

import "./landing.scss"
import { RootState } from '../../reducers';


interface FileData {
    date: any;
    name: string;
    url: string;
}

const Landing = () => {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.account.account);
    const provider = useSelector((state: RootState) => state.provider.provider);
    let contract = useSelector((state: RootState) => state.contract.contract);
    const accountNo = useSelector((state: RootState) => state.account.account);
    const files = useSelector((state: RootState) => state.files.files);

    useEffect(() => {
        window.ethereum.on("chainChanged", () => {
            window.location.reload()
        })

        window.ethereum.on("accountsChanged", () => {
            window.location.reload()
        })
        const options = { method: 'GET', headers: { Authorization: `Bearer ${import.meta.env.VITE_APP_PINATA_JWT}` } };
        const fetchFiles = async () => {
            await fetch('https://api.pinata.cloud/data/pinList', options)
                .then(data => data.json())
                .then((data) => data?.rows)
                .then(
                    (data) => (
                        data.map((fileData: any) => {
                            const fileExists = files.some(file => file?.id === fileData.id);
                            if (!fileExists) {
                                dispatch(
                                    setFiles({
                                        date_pinned: fileData.date_pinned,
                                        id: fileData.id,
                                        ipfs_pin_hash: fileData.ipfs_pin_hash,
                                        name: fileData.metadata.name,
                                        user_id: fileData.user_id,
                                        size: fileData.size
                                    })
                                )
                            }
                        })
                    )
                )
            console.log(files)
        }
        fetchFiles()
    }, []);


    const [gridView, setGridView] = useState(false);
    const [listView, setListView] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<FileData[]>([])
    const [file, setFile] = useState<null | File>(null);
    const [fileName, setFileName] = useState<string>("No image selected");

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
                const reader = new window.FileReader();
                reader.onloadend = () => {
                    const previewUrl = reader.result as string;
                    const obj = {
                        name: selectedFile.name,
                        url: previewUrl,
                        date: new Date()
                    };
                    setData(prevData => [...prevData, obj]);
                };
                reader.readAsArrayBuffer(selectedFile);
                reader.onloadend = () => {
                    setFile(selectedFile);
                };
                setFileName(selectedFile.name);
                console.log(data)
                event.preventDefault();
            } else {
                alert('Unsupported file type. Please select a PNG, JPEG, WebP, or SVG file.');
                event.target.value = '';
            }
        }
    }

    const handleFileClick = () => {
        fileInputRef.current?.click();
    }
    const handleDownload = (imageUrl: string | undefined, filename: string | undefined) => {
        if (!imageUrl) {
            console.error("Image URL is undefined");
            return;
        }

        const downloadLink = document.createElement('a');
        downloadLink.href = imageUrl;
        downloadLink.download = "Archivum_" + filename;
        downloadLink.click();
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

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const metadata = JSON.stringify({
                    name: fileName,
                });
                formData.append("pinataMetadata", metadata);
                const options = JSON.stringify({
                    cidVersion: 0,
                });
                formData.append("pinataOptions", options);
                const resFile = await fetch(
                    "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_APP_PINATA_JWT}`,
                        },
                        body: formData,
                    }
                );
                const uploadResult = await resFile.json();
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${uploadResult.IpfsHash}`;
                // contract.add(account, ImgHash)
                alert("Successfully Image Uploaded");
                setFileName("No image selected");
                setFile(null);
                window.location.reload()
            } catch (error) {
                console.log("Unable to upload to Pinata!", error)
            }
        }
    }

    return (
        <>
            <Header2 />
            <div className="main-header">
                <div className="heading">My Files</div>
                <form
                    className="button"
                    onSubmit={handleSubmit}
                >
                    <label onClick={handleFileClick} htmlFor='file-upload'> Add Files</label>
                    <input
                        disabled={!accountNo}
                        type="file"
                        id="file-upload"
                        name="data"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        accept=".png, .jpeg, .jpg, .webp, .svg"
                    />
                    <button className="main-header_submit-btn" type='submit'>Submit</button>
                </form>
            </div >
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
                            {files.map(co =>
                                <div className="card" key={uuidv4()}>
                                    <a className="img-container" href={`https://gateway.pinata.cloud/ipfs/${co.ipfs_pin_hash}`} target="_blank">
                                        <img src={`https://gateway.pinata.cloud/ipfs/${co.ipfs_pin_hash}`} alt={`${co.name}`} width={"100%"} />
                                    </a>
                                    <div className="text-container">
                                        <div className="text-container_heading">
                                            {co.name}
                                        </div>
                                        <div className='text-container_details'>
                                            <div className="date">
                                                {co.date_pinned.toLocaleString()}
                                            </div>
                                            <div className="download"
                                                style={{ cursor: "pointer" }} onClick={() => handleDownload(co.ipfs_pin_hash, co.name)}>
                                                <FaDownload />
                                            </div>
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
                                    {files.map((co, index) => <tr key={index + 1}>
                                        <td data-label="SrNo">{index + 1}</td>
                                        <td data-label="File Name">{co.name}</td>
                                        <td data-label="Datetime">{co.date_pinned.toLocaleString()}</td>
                                        <td data-label="Download" style={{ cursor: "pointer" }} onClick={() => handleDownload(co.ipfs_pin_hash, co.name)}><FaDownload /></td>
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