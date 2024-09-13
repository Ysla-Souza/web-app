// src/components/Footer/Footer.jsx
import React from 'react';
import visaIcon from '../../assets/visa@2x.png';
import mastercardIcon from '../../assets/mastercard@2x.png';
import amexIcon from '../../assets/amex@2x.png';
import dinersIcon from '../../assets/diners@2x.png';
import auraIcon from '../../assets/aura@2x.png';
import eloIcon from '../../assets/elo@2x.png';
import hipercardIcon from '../../assets/hipercard@2x.png';
import discoverIcon from '../../assets/discover@2x.png';
import boletoIcon from '../../assets/boleto@2x.png';
import pixIcon from '../../assets/pix@2x.png';
import nuvemIcon from '../../assets/4190@2x.png';
import instagramIcon from '../../assets/instagram.png';
import whatsappIcon from '../../assets/whatsapp.png';
import facebookIcon from '../../assets/facebook.png';
import pinterestIcon from '../../assets/pinterest.png';
import tiktokIcon from '../../assets/tiktok.png';

const Footer = () => {
    return (
      <footer className="bg-yellow-400 text-white py-8 px-12 flex flex-col items-center text-center">
        {/* Seção de mídias sociais */}
        <div className="flex justify-center gap-4 mb-4">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src={instagramIcon} alt="Ícone Instagram" className="w-8 h-8" />
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <img src={whatsappIcon} alt="Ícone WhatsApp" className="w-8 h-8" />
          </a>
          <a href="https://pt-br.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src={facebookIcon} alt="Ícone Facebook" className="w-8 h-8" />
          </a>
          <a href="https://br.pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
            <img src={pinterestIcon} alt="Ícone Pinterest" className="w-8 h-8" />
          </a>
          <a href="https://www.tiktok.com/?lang=en" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <img src={tiktokIcon} alt="Ícone TikTok" className="w-8 h-8" />
          </a>
        </div>
        <p className="mb-2"><a href="mailto:crisblacshop@gmail.com" className="underline">crisblacshop@gmail.com</a></p>
        <p className="mb-4">Dona Olga Marques, 240</p>
        {/* Bandeiras de cartões */}
        <div className="flex justify-center gap-4 mb-4 flex-wrap">
          <img src={visaIcon} alt="Visa" className="w-12 h-auto" />
          <img src={mastercardIcon} alt="Mastercard" className="w-12 h-auto" />
          <img src={amexIcon} alt="American Express" className="w-12 h-auto" />
          <img src={dinersIcon} alt="Diners Club" className="w-12 h-auto" />
          <img src={auraIcon} alt="Aura" className="w-12 h-auto" />
          <img src={eloIcon} alt="Elo" className="w-12 h-auto" />
          <img src={hipercardIcon} alt="Hipercard" className="w-12 h-auto" />
          <img src={discoverIcon} alt="Discover" className="w-12 h-auto" />
          <img src={boletoIcon} alt="Boleto" className="w-12 h-auto" />
          <img src={pixIcon} alt="Pix" className="w-12 h-auto" />
          <img src={nuvemIcon} alt="Nuvem" className="w-12 h-auto" />
        </div>
        <p className="mb-4">&copy; 2024 CrisBlac. Todos os direitos reservados.</p>
        <p>
          Ao navegar por este site <strong>você aceita o uso de cookies</strong> para agilizar a sua experiência de compra.
          <a href="#" className="underline">Entendi</a>
        </p>
      </footer>
    );
  };
  
  export default Footer;