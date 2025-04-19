import { useState, useEffect } from "react";
import EmployeeCard from "../components/EmployeeCard";
import axios from "axios";
import Leaderboard from "../components/Leaderboard";

function Employees() {
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const response = await axios.get(
					"http://localhost:4000/api/admin/employees"
				);
				setEmployees(response.data || []);
				setLoading(false);
			} catch (err) {
				console.error("Failed to fetch employees:", err);
				setError("Failed to load employees");
				setLoading(false);
			}
		};

		fetchEmployees();
	}, []);

	const filteredEmployees = employees.filter(
		(employee) =>
			employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.organisation.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-900">Employees</h2>
				<p className="text-gray-600">
					View and manage employee participation in CSR activities
				</p>
			</div>

			<div className="flex flex-row gap-12">
				<div className="w-1/2">
					<div className="mb-6">
						<div className="relative">
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search employees by name or email..."
								className="bg-white w-full p-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							/>
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg
									className="h-5 w-5 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
						</div>
					</div>

					{loading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div key={i} className="card p-5 animate-pulse">
									<div className="flex items-center space-x-4">
										<div className="h-12 w-12 bg-gray-200 rounded-full"></div>
										<div className="flex-1">
											<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
											<div className="h-3 bg-gray-200 rounded w-1/2"></div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : error ? (
						<div className="bg-red-50 p-4 rounded-md">
							<p className="text-red-600">{error}</p>
						</div>
					) : filteredEmployees.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
							{filteredEmployees.map((employee) => (
								<EmployeeCard key={employee._id} employee={employee} />
							))}
						</div>
					) : (
						<div className="bg-white p-8 rounded-lg text-center">
							<p className="text-gray-600">
								No employees found matching your search.
							</p>
						</div>
					)}
				</div>
				<div className="w-1/2">
					<Leaderboard employees={employees} />
				</div>
			</div>
		</div>
	);
}

export default Employees;
