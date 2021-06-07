import React from 'react';
import './index.css';
import excel from '../../../assets/docs/data_input_example.xlsx'
import how_excel from '../../../assets/docs/panduan_input_file_excel.pdf'
import how_form from '../../../assets/docs/panduan_input_data_form.pdf'
const AboutMethod = (props) => {
    return (
        <div className="about-method">
            <h5>Cara Menambahkan Data Pegawai</h5>
            <ol>
                <li>
                    <h6>Mengisi Form Data</h6>
                    <div className="content-li">
                        <p>
                            Data pegawai dapat ditambahkan dengan mengisi beberapa form data, dimana form data tersebut berjumlah duabelas bagian,
                            duabelas bagian tersebut adalah Data Diri, Data Pegawai, Data Pajak, Data Kontrak, Data Masa Kerja, Data Unpaid, Data Anak
                            Data Pembayaran, Data Jabatan, Data Golongan/Pangkat, Data Sertifikasi, Data Pendidikan. Anda juga dapat menambahkan lampiran berupa file ataupun foto,
                            Anda juga dapat mengunggah foto diri pegawai.Untuk keterangan lebih lanjut download penjelesan berikut  <a rel="noreferrer" target="_blank" href={how_form}> Klik untuk download</a>.
                        </p>
                    </div>
                </li>
                <li>
                    <h6>Import data dengan excel</h6>
                    <div className="content-li">
                        <p>
                            Selain mengisi form, sistem juga mendukung untuk menambahkan data pegawai baru menggunakan file excel dimana format dari file excel anda dapat download 
                            <a rel="noreferrer" target="_blank" href={excel}> disini</a>. Anda juga dapat melihat panduan lengkap cara menambahkan data dengan file excel  <a rel="noreferrer" target="_blank" href={how_excel}> Klik untuk download</a>.
                    </p>
                    </div>
                </li>
            </ol>
        </div>
    )
}

export default AboutMethod;