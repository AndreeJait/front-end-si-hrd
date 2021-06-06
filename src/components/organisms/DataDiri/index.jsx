import axios from 'axios';
import React, { useState } from 'react';
import InputLabel from '../../atoms/InputLabel';
import RadioLabel from '../../atoms/RadioLabel';
import TextAreaLabel from '../../atoms/TextAreaLabel';
import SelectLabel from '../../atoms/SelectLabel';
import './index.css';

const DataDiri = (props) => {
    const [provinsi] = useState([{ text: "Pilih Provinsi", value: "Pilih Provinsi" }, ...props.provinsi.map(item => { return { text: item.nama, value: item.nama } })]);
    const [kelurahan, setKelurahan] = useState([{ text: "Pilih Kelurahan", value: "Pilih Kelurahan" }]);
    const [kecamatan, setKecamatan] = useState([{ text: "Pilih Kecamatan", value: "Pilih Kecamatan" }]);
    const [kabupaten, setKabupaten] = useState([{ text: "Pilih Kabupaten", value: "Pilih Kabupaten" },]);
    const [tempKabupaten, setTempKabupaten] = useState([])
    const [tempKecamatan, setTempKecamatan] = useState([])
    const handleSelectProvinsi = (event) => {
        let _provinsi = event.target.value;
        if (_provinsi !== "Pilih Provinsi") {
            let find = props.provinsi.find((item) => item.nama === _provinsi);
            axios.get("https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=" + find.id)
            .then(result=>{
                setKabupaten([{ text: "Pilih Kabupaten", value: "Pilih Kabupaten" },...result.data.kota_kabupaten.map(item=>{return {text: item.nama, value: item.nama}})]);
                setTempKabupaten(result.data.kota_kabupaten);
            }).catch(err=>{
                alert("Failed to get Kabupaten")
                setKabupaten([{ text: "Pilih Kabupaten", value: "Pilih Kabupaten" },]);
            });
        }else{
            setKabupaten([{ text: "Pilih Kabupaten", value: "Pilih Kabupaten" },]);
        }
        props.onChange(event)
    }
    const handleSelectKecamatan = (event) => {
        let _kecamatan = event.target.value;
        if (_kecamatan !== "Pilih Kecamatan") {
            let find = tempKecamatan.find((item) => item.nama === _kecamatan);
            axios.get("https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=" + find.id)
            .then(result=>{
                setKelurahan([{ text: "Pilih Kelurahan", value: "Pilih Kelurahan" },...result.data.kelurahan.map(item=>{return {text: item.nama, value: item.nama}})]);
            }).catch(err=>{
                alert("Failed to get Keluarahan")
                setKelurahan([{ text: "Pilih Kelurahan", value: "Pilih Kelurahan" },]);
            });
        }else{
            setKelurahan([{ text: "Pilih Kelurahan", value: "Pilih Kelurahan" },]);
        }
        props.onChange(event)
    }
    const handleSelectKabupaten = (event) => {
        let _kabupaten = event.target.value;
        if (_kabupaten !== "Pilih Kabupaten") {
            let find = tempKabupaten.find((item) => item.nama === _kabupaten);
            axios.get("https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=" + find.id)
            .then(result=>{
                setKecamatan([{ text: "Pilih Kecamatan", value: "Pilih Kecamatan" },...result.data.kecamatan.map(item=>{return {text: item.nama, value: item.nama}})]);
                setTempKecamatan(result.data.kecamatan);
            }).catch(err=>{
                alert("Failed to get Kecamatan")
                setKecamatan([{ text: "Pilih Kecamatan", value: "Pilih Kecamatan" },]);
            });
        }else{
            setKabupaten([{ text: "Pilih Kecamatan", value: "Pilih Kecamatan" },]);
        }
        props.onChange(event)
    }
    const handleSelectKeluraahan = (event) => {
        props.onChange(event)
    }
    const handleOnChangeInput = (event) => {
        props.onChange(event)
    }
    return (
        <div className="data-diri">
            <h5>Data Diri</h5>
            <div className="data-row">
                <div className="item-row">
                    <InputLabel label="NIP" onChange={handleOnChangeInput} type="text" name="nip" id="nip" placeholder="NIP" value={props.data.nip}/>
                    <InputLabel label="NIDN" onChange={handleOnChangeInput} type="text" name="nidn" id="nidn" placeholder="NIDN" value={props.data.nidn} />
                    <InputLabel label="Nama" onChange={handleOnChangeInput} type="text" name="nama" id="nama" placeholder="Nama" value={props.data.nama}/>
                    <InputLabel label="BPJS Kesehatan" onChange={handleOnChangeInput} type="text" name="bpjs_kesehatan" id="bpjs_kesehatan" placeholder="BPJS Kesehatan" value={props.data.bpjs_kesehatan} />
                    <InputLabel label="BPJS Ketenagakerjaan" onChange={handleOnChangeInput} type="text" name="bpjs_ketenagakerjaan" id="bpjs_ketenagakerjaan" placeholder="BPJS Ketenaga Kerjaan" value={props.data.bpjs_ketenagakerjaan} />
                    <SelectLabel onChange={handleSelectProvinsi} label="Provinsi" option={provinsi} name="provinsi" id="provinsi" value={props.data.provinsi} ></SelectLabel>
                    <SelectLabel onChange={handleSelectKabupaten} label="Kabupaten" option={kabupaten} name="kabupaten" id="kabupaten" value={props.data.kabupaten} ></SelectLabel>
                    <SelectLabel onChange={handleSelectKecamatan} label="Kecamatan" option={kecamatan} name="kecamatan" id="kecamatan" value={props.data.kecamatan}></SelectLabel>
                    <SelectLabel onChange={handleSelectKeluraahan} label="Kelurahan" option={kelurahan} name="kelurahan" id="kelurahan" value={props.data.keluarahan} ></SelectLabel>
                    <TextAreaLabel onChange={handleOnChangeInput} label="Alamat" name="alamat" id="alamat" placeholder="Alamat Lengkap" value={props.data.alamat} ></TextAreaLabel>
                    <InputLabel label="Kode Pos" onChange={handleOnChangeInput} type="text" name="kode_pos" id="kode_pos" placeholder="Kode Pos" value={props.data.kode_pos} />
                </div>
                <div className="item-row">
                    <InputLabel label="Telepon" onChange={handleOnChangeInput} type="text" name="telepon" id="telepon" placeholder="Telepon" value={props.data.telepon} />
                    <InputLabel label="Handphone" onChange={handleOnChangeInput} type="text" name="no_hp" id="no_hp"  placeholder="No Handphone" value={props.data.no_hp} />
                    <InputLabel label="Email" onChange={handleOnChangeInput} type="email" name="email" id="email"  placeholder="Alamat Email" value={props.data.email} />
                    <InputLabel label="Tanggal Lahir" onChange={handleOnChangeInput} type="date" name="tanggal_lahir" id="tanggal_lahir" value={(new Date(props.data.tanggal_lahir)).toLocaleString("en-CA", {timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month:"2-digit"})} />
                    <InputLabel label="Tempat Lahir" onChange={handleOnChangeInput} type="text" name="tempat_lahir" id="tempat_lahir" placeholder="Tempat Lahir" value={props.data.tempat_lahir} />
                    <InputLabel label="Agama" onChange={handleOnChangeInput} type="text" name="agama" id="agama"  placeholder="Agama"  value={props.data.agama} />
                    <InputLabel label="No KTP" onChange={handleOnChangeInput} type="text" name="no_ktp" id="no_ktp" placeholder="No KTP" value={props.data.no_ktp} />
                    <RadioLabel label="Jenis Kelamin" onChange={handleOnChangeInput} choice={["Laki-laki", "Perempuan"]} name="jenis_kelamin" id="jenis_kelamin" value={props.data.jenis_kelamin} />
                    <RadioLabel label="Status Menikah" onChange={handleOnChangeInput} choice={["Belum Menikah", "Sudah Menikah"]} name="status_nikah" id="status_nikah" value={props.data.status_nikah} />
                    <InputLabel label="Nama Pasangan" onChange={handleOnChangeInput} type="text" name="nama_pasangan" id="nama_pasangan" placeholder="Nama Pasangan" value={props.data.nama_pasangan} />
                    <InputLabel label="Tanggal Lahir Pasangan" onChange={handleOnChangeInput} type="date" name="tanggal_lahir_pasangan" id="tanggal_lahir_pasangan" value={(new Date(props.data.tanggal_lahir_pasangan)).toLocaleString("en-CA", {timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month:"2-digit"})} />
                    <InputLabel label="Tempat Lahir Pasangan" onChange={handleOnChangeInput} type="text" name="tempat_lahir_pasangan" id="tempat_lahir_pasangan" placeholder="Tempat Lahir Pasangan" value={props.data.tempat_lahir_pasangan} />
                </div>
            </div>
        </div>
    );
}

export default DataDiri;