import { Twitter, Linkedin, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                support@portal.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-400" />
                +1 (123) 456-7890
              </li>
            </ul>

            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-white" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Ideas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Submit Idea
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()}{" "}
            <Link href="/">
              <span className="text-lg font-semibold">
                <span className="text-green-600 font-quicksand">Eco</span>
                Hive
              </span>
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
